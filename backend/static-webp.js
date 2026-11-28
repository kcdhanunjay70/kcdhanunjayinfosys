import express from 'express';

const legacyImageUrl = /\.(?:png|jpe?g|gif|bmp|tiff?|avif)$/i;
const explicitWebp = /(?:^|,)\s*image\/webp\s*(?=;|,|$)/i;

export function staticWithWebp(root, options) {
  const serve = express.static(root, options);
  return (req, res, next) => {
    const originalUrl = req.url;
    const queryIndex = originalUrl.indexOf('?');
    const pathname = queryIndex === -1 ? originalUrl : originalUrl.slice(0, queryIndex);
    if (!legacyImageUrl.test(pathname) || !['GET', 'HEAD'].includes(req.method)) {
      return serve(req, res, next);
    }
    res.vary('Accept');
    if (!explicitWebp.test(req.get('Accept') || '') || !req.accepts('image/webp')) {
      return serve(req, res, next);
    }

    const query = queryIndex === -1 ? '' : originalUrl.slice(queryIndex);
    req.url = pathname + '.webp' + query;
    return serve(req, res, err => {
      req.url = originalUrl;
      if (err) return next(err);
      return serve(req, res, next);
    });
  };
}
