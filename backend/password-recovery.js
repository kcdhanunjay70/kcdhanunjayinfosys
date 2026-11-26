import { createHmac, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';

const lifetime = 10 * 60 * 1000;
const resendInterval = 60 * 1000;
const maxAttempts = 5;
const genericMessage = 'If an eligible student account uses that email, a reset code will be sent.';

export function registerPasswordRecovery(app, { users, secret, sendEmail }) {
  const limit = (requests) => rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: requests,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests. Please try again in 15 minutes.' },
  });
  const route = (handler) => (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    handler(req, res).catch(next);
  };
  const error = (res, status, message) => res.status(status).json({ success: false, message });
  const studentFilter = (body) => {
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    return email.length <= 254 && /^\S+@\S+\.\S+$/.test(email)
      ? { email, role: 'student', is_active: { $ne: false } }
      : null;
  };
  const digest = (user, nonce, code) => createHmac('sha256', secret)
    .update(JSON.stringify(['student-password-reset', String(user._id), user.email,
      user.passwordHash, user.tokenVersion ?? 0, nonce, code]))
    .digest();

  app.post('/api/auth/forgot-password', limit(10), route(async (req, res) => {
    const filter = studentFilter(req.body);
    if (!filter) return error(res, 400, 'Enter a valid email address.');
    if (!sendEmail) return error(res, 503, 'Email recovery is temporarily unavailable. Contact the institute for help.');

    const user = await users.findOne(filter);
    if (user) {
      const now = Date.now();
      const nonce = randomUUID();
      const code = String(randomInt(1_000_000)).padStart(6, '0');
      const updated = await users.updateOne({
        ...filter,
        _id: user._id,
        passwordHash: user.passwordHash,
        tokenVersion: user.tokenVersion ?? { $exists: false },
        $or: [
          { 'passwordReset.sentAt': { $exists: false } },
          { 'passwordReset.sentAt': { $lte: new Date(now - resendInterval) } },
        ],
      }, {
        $set: { passwordReset: {
          nonce, digest: digest(user, nonce, code).toString('hex'), attempts: 0,
          sentAt: new Date(now), expiresAt: new Date(now + lifetime),
        } },
      });
      if (updated.modifiedCount) {
        void sendEmail({
          to: user.email,
          subject: 'KCDHANUNJAY INFOSYS password reset code',
          text: `Your password reset code is ${code}. It expires in 10 minutes and can be used once. If you did not request a reset, you can ignore this email.`,
        }).catch(() => console.warn('Password reset email delivery failed'));
      }
    }
    return res.status(202).json({ success: true, message: genericMessage });
  }));

  app.post('/api/auth/reset-password', limit(20), route(async (req, res) => {
    const filter = studentFilter(req.body);
    const { code, password } = req.body || {};
    if (!filter || typeof code !== 'string' || !/^\d{6}$/.test(code)) {
      return error(res, 400, 'Enter your registered email and six-digit code.');
    }
    if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
      return error(res, 400, 'Use at least 8 characters and at most 72 bytes for your password.');
    }
    const invalid = () => error(res, 400, 'Invalid or expired code. Request a new code and try again.');
    const user = await users.findOneAndUpdate({
      ...filter,
      'passwordReset.expiresAt': { $gt: new Date() },
      'passwordReset.attempts': { $lt: maxAttempts },
    }, { $inc: { 'passwordReset.attempts': 1 } }, { returnDocument: 'after' });
    if (!user) return invalid();
    const challenge = user.passwordReset;
    const expected = Buffer.from(challenge.digest, 'hex');
    if (!timingSafeEqual(expected, digest(user, challenge.nonce, code))) return invalid();

    const passwordHash = await bcrypt.hash(password, 12);
    const updated = await users.updateOne({
      ...filter,
      _id: user._id,
      passwordHash: user.passwordHash,
      tokenVersion: user.tokenVersion ?? { $exists: false },
      'passwordReset.nonce': challenge.nonce,
      'passwordReset.expiresAt': { $gt: new Date() },
    }, {
      $set: { passwordHash },
      $unset: { passwordReset: '' },
      $inc: { tokenVersion: 1 },
    });
    if (!updated.modifiedCount) return invalid();
    return res.json({ success: true, message: 'Password updated. Log in with your new password.' });
  }));
}
