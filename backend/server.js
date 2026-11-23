import 'dotenv/config';
import {readFileSync} from 'node:fs';
import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {MongoClient,ObjectId} from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import compression from 'compression';
import nodemailer from 'nodemailer';
import {buildResultEmail} from './result-notifications.js';

const {MONGODB_URI,JWT_SECRET,ADMIN_EMAIL,ADMIN_PASSWORD,PORT=3000}=process.env;
if(!MONGODB_URI || !JWT_SECRET || JWT_SECRET.length<32) throw Error('Set MONGODB_URI and JWT_SECRET (32+ characters)');
const smtpTransporter = process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD
  ? nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD
      }
    })
  : null;
function resultWhatsAppUrl(result, rank, participants) {
  const text = [
    'KCDHANUNJAY INFOSYS - Exam Result',
    `Student: ${result.name}`,
    `Student ID: ${result.studentId}`,
    `Exam: ${result.exam}`,
    `Score: ${result.score}/${result.total}`,
    `Percentage: ${result.percentage}%`,
    `Rank: ${rank} of ${participants}`
  ].join('\n');

  return `https://wa.me/919494705353?text=${encodeURIComponent(text)}`;
}
async function sendResultEmails(result, rank, participants) {
  if (!smtpTransporter) {
    console.warn('Result emails skipped: SMTP credentials not configured');
    return;
  }

  const messages = buildResultEmail(result, rank, participants);
  const sender = process.env.SMTP_USER;
  const adminEmail = process.env.RESULT_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

  const recipients = [
    {
      label: 'student',
      to: result.email,
      subject: messages.studentSubject,
      text: messages.studentText
    },
    {
      label: 'admin',
      to: adminEmail,
      subject: messages.adminSubject,
      text: messages.adminText
    }
  ];

  for (const recipient of recipients) {
    if (!recipient.to) continue;

    const notification = {
      result_id: result.id,
      recipient: recipient.label,
      status: 'sending',
      created_at: new Date()
    };

    try {
      await c('result_notifications').insertOne(notification);
    } catch (claimError) {
      if (claimError.code === 11000) continue;
      console.error('Notification tracking failed:', claimError);
      continue;
    }

    try {
      await smtpTransporter.sendMail({
        from: sender,
        to: recipient.to,
        subject: recipient.subject,
        text: recipient.text
      });
      console.log(`SMTP accepted result email for ${recipient.label}`);
      try {
        await c('result_notifications').updateOne(
          {result_id: result.id, recipient: recipient.label},
          {$set: {status: 'sent', sent_at: new Date()}}
        );
      } catch (trackingError) {
        console.error(`Email accepted but status update failed for ${recipient.label}:`, trackingError.message);
      }
    } catch (error) {
      await c('result_notifications').updateOne(
        {result_id: result.id, recipient: recipient.label},
        {$set: {status: 'failed', failed_at: new Date(), error: String(error.message).slice(0, 300)}}
      ).catch(e => console.error('Notification status update failed:', e.message));
      console.error(`Result email failed for ${recipient.label}:`, error.message);
    }
  }
}
const mongo=new MongoClient(MONGODB_URI,{serverSelectionTimeoutMS:12000});
await mongo.connect();
const db=mongo.db(process.env.DB_NAME||'kcdhanunjayinfosys');
const c=name=>db.collection(name);
const indexes=[['users',{email:1},{unique:true}],['users',{phone:1},{unique:true,sparse:true}],['users',{username:1},{unique:true}],['exams',{type:1,mock:1}],['questions',{exam_id:1}],['sessions',{user_id:1,exam_id:1,status:1}],['results',{exam_id:1,score:-1,created_at:1}],['results',{attempt_id:1},{unique:true,partialFilterExpression:{attempt_id:{$type:'string'}}}],['payments',{user_id:1,exam_type:1,mock:1}],['payments',{reference_id:1},{unique:true}],['audit',{created_at:-1}],['result_notifications',{result_id:1,recipient:1},{unique:true}]];
await Promise.all(indexes.map(([name,key,options])=>c(name).createIndex(key,options||{})));
if(ADMIN_EMAIL&&ADMIN_PASSWORD){const email=ADMIN_EMAIL.trim().toLowerCase();if(!await c('users').findOne({email})){await c('users').insertOne({name:'Administrator',email,username:`admin_${randomUUID().slice(0,8)}`,passwordHash:await bcrypt.hash(ADMIN_PASSWORD,12),role:'admin',is_active:true,created_at:new Date()});console.log('Initial admin created');}}
const ARE_TRANSLATIONS = JSON.parse(readFileSync(new URL('./kcdi-are-translations.json', import.meta.url), 'utf8'));
const app=express();app.disable('x-powered-by');app.set('trust proxy',1);
app.use(helmet({contentSecurityPolicy:false,crossOriginEmbedderPolicy:false}));
app.use(compression());
app.use(express.json({limit:'1mb'}));
const http=createServer(app),io=new Server(http,{cors:{origin:false}});
const asyncRoute=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
const err=(res,status,message,extra={})=>res.status(status).json({success:false,message,...extra});
const id=()=>randomUUID();
const iso=v=>v instanceof Date?v.toISOString():v;
const uid=u=>String(u._id);
const pub=u=>({id:uid(u),name:u.name,email:u.email,phone:u.phone||'',username:u.username,role:u.role});
const tokenFor=u=>jwt.sign({sub:uid(u),tv:u.tokenVersion||0},JWT_SECRET,{expiresIn:'12h'});
const getUser=async token=>{try{const p=jwt.verify(token,JWT_SECRET);if(!ObjectId.isValid(p.sub))return null;const u=await c('users').findOne({_id:new ObjectId(p.sub)});return u&&u.is_active!==false&&(Number.isInteger(p.tv)?p.tv:0)===(u.tokenVersion||0)?u:null;}catch{return null;}};
const bearer=req=>/^Bearer (.+)$/i.exec(req.headers.authorization||'')?.[1]||'';
const optionalAuth=asyncRoute(async(req,res,next)=>{req.user=await getUser(bearer(req));next()});
const auth=asyncRoute(async(req,res,next)=>{req.user=await getUser(bearer(req));if(!req.user)return err(res,401,'Login required');next()});
const admin=(req,res,next)=>req.user.role==='admin'?next():err(res,403,'Admin access required');
const secure=(route,handler)=>app.get(route,auth,admin,asyncRoute(handler));
const rate=rateLimit({windowMs:15*60*1000,limit:30,standardHeaders:'draft-7',legacyHeaders:false});
const clean=s=>String(s??'').trim();
const validEmail=s=>/^\S+@\S+\.\S+$/.test(s);
const validPhone=s=>/^\d{10}$/.test(s);
const cleanUser=u=>({id:uid(u),name:u.name,email:u.email,phone:u.phone||'',username:u.username,is_active:u.is_active!==false,is_paid:false,paid_exams:[],password_status:'Set securely',created_at:iso(u.created_at)});
async function createUser(body){const {name,email,phone,password}=body||{};if(clean(name).length<2||!validEmail(clean(email))||!validPhone(clean(phone))||typeof password!=='string'||password.length<8||password.length>128)throw Object.assign(new Error('Valid name, email, 10-digit mobile and password (8-128 characters) required'),{status:400});const u={name:clean(name),email:clean(email).toLowerCase(),phone:clean(phone),username:`student_${id().slice(0,12)}`,passwordHash:await bcrypt.hash(password,12),role:'student',is_active:true,created_at:new Date()};try{const r=await c('users').insertOne(u);u._id=r.insertedId;return u;}catch(e){if(e.code===11000)throw Object.assign(new Error('Email or mobile already registered'),{status:409});throw e;}}
app.get('/api/health',asyncRoute(async(req,res)=>{await db.command({ping:1});res.json({success:true,database:'connected'});}));
app.post('/api/auth/register',rate,asyncRoute(async(req,res)=>{const u=await createUser(req.body);res.status(201).json({success:true,username:u.username});}));
app.post('/api/auth/login',rate,asyncRoute(async(req,res)=>{const {email,password,role}=req.body||{};if(typeof email!=='string'||typeof password!=='string')return err(res,400,'Credentials required');const key=clean(email);const u=await c('users').findOne({$or:[{email:key.toLowerCase()},{phone:key},{username:key}]});if(!u||u.is_active===false||!await bcrypt.compare(password,u.passwordHash)||(role&&role!==u.role))return err(res,401,'Invalid credentials');await c('login_logs').insertOne({id:id(),user_id:uid(u),name:u.name,email:u.email,ip_address:req.ip,login_time:new Date()});res.json({success:true,token:tokenFor(u),user:pub(u)});}));
app.get('/api/auth/verify',auth,(req,res)=>res.json({success:true,user:pub(req.user)}));
app.patch('/api/profile',auth,rate,asyncRoute(async(req,res)=>{
  if(req.user.role!=='student' && req.user.role!=='admin')
  return err(res,403,'Profile access denied');

if(req.user.role==='admin'){
  const body=req.body;

  if(!body || typeof body!=='object' || Array.isArray(body) ||
     Object.keys(body).length!==2 ||
     typeof body.currentPassword!=='string' ||
     typeof body.phone!=='string')
    return err(res,400,'Phone and current password required');

  if(!await bcrypt.compare(body.currentPassword,req.user.passwordHash))
    return err(res,403,'Incorrect current password');

  const phone=clean(body.phone);
  if(!validPhone(phone))
    return err(res,400,'Mobile number must contain 10 digits');

  try{
    const updated=await c('users').findOneAndUpdate(
      {_id:req.user._id,role:'admin',is_active:{$ne:false}},
      {$set:{phone,updated_at:new Date()}},
      {returnDocument:'after'}
    );

    if(!updated)return err(res,404,'Admin not found');
    return res.json({success:true,user:pub(updated)});
  }catch(e){
    if(e.code===11000)
      return err(res,409,'Mobile number already registered');
    throw e;
  }
}
  const body=req.body;
  if(!body||typeof body!=='object'||Array.isArray(body))return err(res,400,'Invalid profile data');
  const allowed=['name','email','phone','currentPassword'];
  const keys=Object.keys(body);
  if(!keys.length||keys.some(k=>!allowed.includes(k)))return err(res,400,'Only name, email and phone can be updated');
  if(typeof body.currentPassword!=='string'||!body.currentPassword)return err(res,400,'Current password required');
  if(!await bcrypt.compare(body.currentPassword,req.user.passwordHash))return err(res,403,'Incorrect current password');
  if(!keys.some(k=>k!=='currentPassword'))return err(res,400,'At least one profile field is required');
  const updates={};
  for(const field of keys.filter(k=>k!=='currentPassword')){
    if(typeof body[field]!=='string')return err(res,400,'Invalid '+field);
    updates[field]=clean(body[field]);
  }
  if(updates.name!==undefined&&(updates.name.length<2||updates.name.length>100))return err(res,400,'Name must be 2-100 characters');
  if(updates.email!==undefined){updates.email=updates.email.toLowerCase();if(!validEmail(updates.email)||updates.email.length>254)return err(res,400,'Invalid email address');}
  if(updates.phone!==undefined&&!validPhone(updates.phone))return err(res,400,'Mobile number must contain 10 digits');
  try{
    const updated=await c('users').findOneAndUpdate({_id:req.user._id,role:'student',is_active:{$ne:false}},{$set:{...updates,updated_at:new Date()}},{returnDocument:'after'});
    if(!updated)return err(res,404,'Student not found');
    res.json({success:true,user:pub(updated)});
  }catch(e){
    if(e.code===11000)return err(res,409,'Email or mobile already registered');
    throw e;
  }
}));
app.patch('/api/auth/change-password',auth,rate,asyncRoute(async(req,res)=>{
  if(req.user.role!=='student')return err(res,403,'Student access required');
  const {currentPassword,newPassword}=req.body||{};
  if(typeof currentPassword!=='string'||!currentPassword)return err(res,400,'Current password required');
  if(typeof newPassword!=='string'||newPassword.length<8||newPassword.length>128)return err(res,400,'New password must be 8-128 characters');
  if(currentPassword===newPassword)return err(res,400,'New password must be different from current password');
  if(!await bcrypt.compare(currentPassword,req.user.passwordHash))return err(res,403,'Incorrect current password');
  const passwordHash=await bcrypt.hash(newPassword,12);
  const result=await c('users').updateOne({_id:req.user._id,role:'student',is_active:{$ne:false},passwordHash:req.user.passwordHash},{$set:{passwordHash,password_changed_at:new Date(),updated_at:new Date()},$inc:{tokenVersion:1}});
  if(!result.matchedCount)return err(res,409,'Password changed or account unavailable. Please log in again');
  res.json({success:true,message:'Password changed successfully'});
}));
const LEGACY_FREE_EXAM_ID='1abd5f62-531d-4d29-9881-a28c92a515b3';
const accessType=e=>e?.access_type==='free'||(!e?.access_type&&e?.id===LEGACY_FREE_EXAM_ID)?'free':'paid';
const isFreeRegisteredExam=e=>Boolean(e&&accessType(e)==='free');
const examPublic=e=>({id:e.id,title:e.title,subject:e.subject,duration:e.duration,total_marks:e.total_marks,type:e.type,mock:e.mock,question_count:e.question_count||0,access_type:accessType(e),is_archived:e.is_archived===true,created_at:e.created_at});
app.post('/api/admin/create-exam',auth,admin,asyncRoute(async(req,res)=>{const b=req.body||{};if(!clean(b.title)||!(Number(b.duration)>0&&Number(b.duration)<=480))return err(res,400,'Title and duration (1-480 minutes) required');if(!['free','paid'].includes(b.access_type))return err(res,400,'Choose FREE or PAID exam access');const e={id:id(),title:clean(b.title),subject:clean(b.subject),duration:Number(b.duration),total_marks:Number(b.total_marks)||0,type:clean(b.type||b.subject||b.title).toLowerCase(),mock:clean(b.mock),access_type:b.access_type,question_count:0,created_at:new Date()};await c('exams').insertOne(e);res.status(201).json({success:true,exam:examPublic(e)});}));
secure('/api/admin/exams',async(req,res)=>res.json({exams:(await c('exams').find().sort({created_at:-1}).limit(500).toArray()).map(examPublic)}));
app.patch('/api/admin/exams/:id/access',auth,admin,asyncRoute(async(req,res)=>{const access=clean(req.body?.access_type).toLowerCase();if(!['free','paid'].includes(access))return err(res,400,'access_type must be free or paid');const result=await c('exams').findOneAndUpdate({id:req.params.id},{$set:{access_type:access,access_updated_at:new Date(),access_updated_by:uid(req.user)}},{returnDocument:'after'});if(!result)return err(res,404,'Exam not found');res.json({success:true,exam:examPublic(result)});}));
app.patch('/api/admin/exams/:id/edit',auth,admin,asyncRoute(async(req,res)=>{
  const b=req.body||{};
  const updates={};

  if(b.title!==undefined){
    if(typeof b.title!=='string'||!clean(b.title))
      return err(res,400,'Valid title required');
    updates.title=clean(b.title);
  }

  if(b.subject!==undefined){
    if(typeof b.subject!=='string')
      return err(res,400,'Invalid subject');
    updates.subject=clean(b.subject);
  }

  if(!Object.keys(updates).length)
    return err(res,400,'No valid changes');

  const previous=await c('exams').findOne({id:req.params.id});
  if(!previous)return err(res,404,'Exam not found');

  updates.updated_at=new Date();
  updates.updated_by=uid(req.user);

  const result=await c('exams').findOneAndUpdate(
    {id:req.params.id},
    {$set:updates},
    {returnDocument:'after'}
  );

  await c('audit').insertOne({
    action:'exam_details_updated',
    exam_id:req.params.id,
    admin_id:uid(req.user),
    before:{title:previous.title,subject:previous.subject},
    after:{title:result.title,subject:result.subject},
    created_at:new Date()
  });

  res.json({success:true,exam:examPublic(result)});
}));
app.patch('/api/admin/exams/:id/archive',auth,admin,asyncRoute(async(req,res)=>{const archived=req.body?.is_archived;if(typeof archived!=='boolean')return err(res,400,'is_archived must be boolean');const result=await c('exams').findOneAndUpdate({id:req.params.id},{$set:{is_archived:archived,archive_updated_at:new Date(),archive_updated_by:uid(req.user)}},{returnDocument:'after'});if(!result)return err(res,404,'Exam not found');res.json({success:true,message:archived?'Exam archived':'Exam restored',exam:{...examPublic(result),is_archived:result.is_archived===true}});}));
app.delete('/api/admin/exams/:id',auth,admin,asyncRoute(async(req,res)=>{
  const examId=clean(req.params.id);
  const exam=await c('exams').findOne({id:examId});
  if(!exam)return err(res,404,'Exam not found');

  if(examId===LEGACY_FREE_EXAM_ID)
    return err(res,409,'Legacy free exam is protected');

  if(exam.is_archived!==true)
    return err(res,409,'Archive the exam before deleting it');

  const [result,session,payment]=await Promise.all([
    c('results').findOne({exam_id:examId},{projection:{_id:1}}),
    c('sessions').findOne({exam_id:examId},{projection:{_id:1}}),
    c('payments').findOne({
      exam_type:exam.type,
      mock:exam.mock||''
    },{projection:{_id:1}})
  ]);

  if(result||session||payment)
    return err(res,409,'Exam has results, attempts or linked payments. Archive it instead.');

  // Remove exam from catalog before deleting its questions.
  const deleted=await c('exams').deleteOne({id:examId});
  if(!deleted.deletedCount)return err(res,409,'Exam could not be deleted');

  const questions=await c('questions').deleteMany({exam_id:examId});
  res.json({
    success:true,
    message:'Exam deleted successfully',
    deletedQuestions:questions.deletedCount
  });
}));
app.get('/api/exams/catalog',auth,asyncRoute(async(req,res)=>{if(req.user.role!=='student'&&req.user.role!=='admin')return err(res,403,'Login required');const exams=await c('exams').find(req.user.role==='admin'?{}:{is_archived:{$ne:true}}).sort({created_at:-1}).limit(500).toArray();res.json({success:true,exams:exams.map(examPublic)});}));
// Allow only images stored in frontend/assets.
function questionImagePath(value) {
  const v = clean(value);
  return /^\/assets\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp|gif)$/i.test(v)
    && !v.includes('..') ? v : '';
}

function normalizeQuestion(b, examId) {
  const opts = Array.isArray(b.options)
    ? b.options
    : [b.option_a, b.option_b, b.option_c, b.option_d];

  const options = opts.map(clean);

  const raw = clean(
    b.correct_answer || b.answer || b.correctAnswer
  ).toUpperCase();

  const answer = /^[A-D]$/.test(raw)
    ? raw
    : /^[0-3]$/.test(raw) ? 'ABCD'[Number(raw)] : '';

  const imagePaths = Array.isArray(b.questionImages)
    ? b.questionImages
    : [b.local_image_file || b.diagram_file].filter(Boolean);

  const questionImages = imagePaths
    .map(questionImagePath)
    .filter(Boolean);

  const optionImages = Array.from({ length: 4 }, (_, i) => {
    const rawImages = Array.isArray(b.optionImages?.[i])
      ? b.optionImages[i]
      : [b.option_image_files?.['ABCD'[i]]].filter(Boolean);

    return rawImages.map(questionImagePath).filter(Boolean);
  });

  const marks = b.marks === undefined ||
    b.marks === null || b.marks === ''
      ? 1
      : Number(b.marks);

  if (
    !clean(b.question) ||
    options.length !== 4 ||
    options.some((x, i) => !x && !optionImages[i].length) ||
    !answer
  ) {
    throw Object.assign(
      new Error('Each question needs question, four options (text or images), and correct_answer A/B/C/D'),
      { status: 400 }
    );
  }

  if (!Number.isInteger(marks) || marks < 1 || marks > 100) {
    throw Object.assign(
      new Error('Question marks must be a whole number from 1 to 100'),
      { status: 400 }
    );
  }

  if (
    imagePaths.length !== questionImages.length ||
    optionImages.some((images, i) => {
      const rawImages = Array.isArray(b.optionImages?.[i])
        ? b.optionImages[i]
        : [b.option_image_files?.['ABCD'[i]]].filter(Boolean);

      return rawImages.length !== images.length;
    })
  ) {
    throw Object.assign(
      new Error('Image URLs must be local /assets/... image paths'),
      { status: 400 }
    );
  }

  return {
    id: id(),
    exam_id: examId,
    question: clean(b.question),
    options,
    questionTranslations: Object.fromEntries(['en','te','hi'].filter(k => typeof (b.questionTranslations?.[k] ?? (k === 'en' ? b.question : b['question_' + k])) === 'string' && (b.questionTranslations?.[k] ?? (k === 'en' ? b.question : b['question_' + k])).trim()).map(k => [k, clean(b.questionTranslations?.[k] ?? (k === 'en' ? b.question : b['question_' + k]))])),
    optionTranslations: Object.fromEntries(['en','te','hi'].map(k => [k, b.optionTranslations?.[k] ?? (k === 'en' ? options : ['a','b','c','d'].map(letter => b['option_' + letter + '_' + k]))]).filter(([k,v]) => Array.isArray(v) && v.length === 4 && v.every(x => typeof x === 'string' && x.trim())).map(([k,v]) => [k, v.map(clean)])),
    correct_answer: answer,
    marks,
    questionImages,
    optionImages,
    created_at: new Date()
  };
}
async function insertQuestions(examId,items){const e=await c('exams').findOne({id:examId});if(!e)throw Object.assign(new Error('Exam not found'),{status:404});if(!Array.isArray(items)||!items.length||items.length>1000)throw Object.assign(new Error('Provide 1-1000 questions'),{status:400});const qs=items.map(q=>normalizeQuestion(q,examId));await c('questions').insertMany(qs);await c('exams').updateOne({id:examId},{$inc:{question_count:qs.length}});return qs.length;}
app.post('/api/admin/add-questions',auth,admin,asyncRoute(async(req,res)=>{const count=await insertQuestions(clean(req.body.exam_id),[req.body]);res.json({success:true,count});}));
app.post('/api/admin/bulk-questions',auth,admin,asyncRoute(async(req,res)=>{let items;try{items=JSON.parse(req.body.bulk_text||'');}catch{return err(res,400,'Bulk questions must be a JSON array');}const count=await insertQuestions(clean(req.body.exam_id),items);res.json({success:true,message:`${count} questions added`,count});}));
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:2*1024*1024},fileFilter:(req,file,cb)=>cb(null,file.mimetype==='application/json'||file.originalname.toLowerCase().endsWith('.json'))});
app.post('/api/admin/upload-questions',auth,admin,upload.single('file'),asyncRoute(async(req,res)=>{if(!req.file)return err(res,400,'JSON file required');let items;try{items=JSON.parse(req.file.buffer.toString('utf8'));}catch{return err(res,400,'Invalid JSON file');}const count=await insertQuestions(clean(req.body.exam_id),items);res.json({success:true,message:`${count} questions uploaded`,count});}));
app.get('/api/admin/questions-template',auth,admin,(req,res)=>{res.attachment('question-upload-template.json').json([{question:'Sample question?',option_a:'First',option_b:'Second',option_c:'Third',option_d:'Fourth',correct_answer:'A'}]);});
app.patch('/api/admin/gate-da-q6-image', auth, admin, asyncRoute(async (req, res) => {
  const examId = '3c23d492-cfdf-4bd8-8cd7-c3d25928ef85';
  const imagePath = '/assets/gate2025-da/2025DAGA06.jpg';

  const filter = {
    exam_id: examId,
    question: {
      $regex: '^Column-I has statements made by Shanthala'
    }
  };

  const questions = await c('questions')
    .find(filter)
    .limit(2)
    .toArray();

  if (questions.length !== 1) {
    return err(res, 409, 'Expected exactly one Q6 question');
  }

  const result = await c('questions').updateOne(
    { _id: questions[0]._id },
    { $set: { questionImages: [imagePath] } }
  );

  res.json({
    success: true,
    matched: result.matchedCount,
    modified: result.modifiedCount,
    questionImages: [imagePath]
  });
}));
const paidKey=(type,mock)=>({exam_type:clean(type).toLowerCase(),mock:clean(mock)});
async function paid(u,type,mock){return Boolean(u&&await c('payments').findOne({user_id:uid(u),...paidKey(type,mock),status:'paid'}));}
app.get('/api/exam/get-active',optionalAuth,asyncRoute(async(req,res)=>{
 const {type='',mock='',access='sample'}=req.query;
 const examId=clean(req.query.exam_id);
 let exam=examId?await c('exams').findOne({id:examId}):await c('exams').findOne({type:clean(type).toLowerCase(),...(mock?{mock:clean(mock)}:{})},{sort:{created_at:-1}});
 if(!exam&&req.user?.role==='admin'&&!examId)exam=await c('exams').findOne({},{sort:{created_at:-1}});
 if(!exam)return err(res,404,'Exam not found');if(exam.is_archived===true && req.user?.role!=='admin')return err(res,404,'Exam not found');
 // Every published exam follows its database setting, regardless of URL access=free/sample/paid.
 if(!req.user)return err(res,401,'Registered student login required');
 if(req.user.role!=='admin'&&!isFreeRegisteredExam(exam)&&!await paid(req.user,exam.type,exam.mock))return err(res,403,'Payment approval required',{paymentRequired:true,exam:examPublic(exam)});
 const questions=await c('questions').find({exam_id:exam.id}).sort({created_at:1}).limit(1000).toArray();
 if(!questions.length)return err(res,404,'This exam has no questions');
 res.json({
  success: true,
  ...examPublic(exam),
  actualType: exam.type,
  questions: questions.map(({
    id, question, options, questionTranslations, optionTranslations, questionImages, optionImages, marks
  }) => ({
    id,
    question,
    options,
    questionImages: questionImages || [],
    optionImages: optionImages || [[], [], [], []],
    marks: marks || 1,
    questionTranslations: questionTranslations || {},
    optionTranslations: optionTranslations || {},
    optionLabels: ['A', 'B', 'C', 'D'],
    ...(exam.id === LEGACY_FREE_EXAM_ID
      ? (ARE_TRANSLATIONS[question] || {})
      : {})
  }))
});
}));
app.post('/api/exam/session',auth,asyncRoute(async(req,res)=>{const examId=clean(req.body.examId);const exam=await c('exams').findOne({id:examId});if(!exam)return err(res,404,'Exam not found');if(exam.is_archived===true && req.user.role!=='admin')return err(res,404,'Exam not found');if(req.user.role!=='admin'&&!isFreeRegisteredExam(exam)&&!await paid(req.user,exam.type,exam.mock))return err(res,403,'Payment approval required',{paymentRequired:true});let s=await c('sessions').findOne({user_id:uid(req.user),exam_id:examId,status:'active',expires_at:{$gt:new Date()}});if(!s){s={id:id(),user_id:uid(req.user),exam_id:examId,answers:{},answer_revision:0,status:'active',created_at:new Date(),expires_at:new Date(Date.now()+exam.duration*60000)};await c('sessions').insertOne(s);}res.json({success:true,attemptId:s.id,expiresAt:iso(s.expires_at),answers:s.answers,answerRevision:s.answer_revision||0});}));
app.put('/api/exam/session/:id/answers',auth,asyncRoute(async(req,res)=>{
 const s=await c('sessions').findOne({id:req.params.id,user_id:uid(req.user),status:'active'});
 if(!s||s.expires_at<=new Date())return err(res,409,'Session expired or unavailable');
 const revision=Number(req.body?.revision);
 if(!Number.isSafeInteger(revision)||revision<1)return err(res,400,'Valid answer revision required');
 const validIds=new Set((await c('questions').find({exam_id:s.exam_id}).project({id:1}).toArray()).map(q=>q.id));
 const answers={};for(const [k,v] of Object.entries(req.body.answers||{})){if(validIds.has(k)&&/^[A-D]$/.test(v))answers[k]=v;}
 // An older in-flight request must never replace a newer answer snapshot.
 const updated=await c('sessions').updateOne({id:s.id,user_id:uid(req.user),status:'active',expires_at:{$gt:new Date()},$or:[{answer_revision:{$lt:revision}},{answer_revision:{$exists:false}}]},{$set:{answers,answer_revision:revision}});
 if(!updated.modifiedCount){const latest=await c('sessions').findOne({id:s.id,user_id:uid(req.user)});if(!latest||latest.status!=='active'||latest.expires_at<=new Date())return err(res,409,'Session expired or unavailable');return res.json({success:true,stale:true,answerRevision:latest.answer_revision||0});}
 res.json({success:true,answerRevision:revision});
}));
app.post('/api/exam/session/:id/finish',auth,asyncRoute(async(req,res)=>{const session=await c('sessions').findOne({id:req.params.id,user_id:uid(req.user)});if(!session)return err(res,404,'Session not found');const result=await c('results').findOne({attempt_id:session.id,user_id:uid(req.user)});if(!result)return err(res,409,'Submit exam results before finishing session');await c('sessions').updateOne({id:session.id,user_id:uid(req.user),status:'active'},{$set:{status:'finished',finished_at:new Date()}});res.json({success:true});}));
app.post('/api/exam/sample-leads',rate,asyncRoute(async(req,res)=>{const b=req.body||{};if(!clean(b.name)||!validEmail(clean(b.email))||!clean(b.phone))return err(res,400,'Name, email and phone required');await c('sample_leads').insertOne({id:id(),name:clean(b.name),email:clean(b.email),phone:clean(b.phone),exam_type:clean(b.exam_type||b.type),mock:clean(b.mock),sample_year:clean(b.sampleYear),access_mode:clean(b.access_mode),exam_url:clean(b.exam_url),created_at:new Date()});res.json({success:true});}));
app.post('/api/results/submit', optionalAuth, asyncRoute(async (req, res) => {
  const b = req.body || {};
  const exam = await c('exams').findOne({ id: clean(b.exam_id) });

  if (!exam) return err(res, 404, 'Exam not found');

  const sample = false;
  // All admin-managed exams require an authenticated server session.

  if (!req.user) return err(res, 401, 'Login required');

  if (
    req.user.role !== 'admin' &&
    !isFreeRegisteredExam(exam) &&
    !await paid(req.user, exam.type, exam.mock)
  ) {
    return err(res, 403, 'Payment required');
  }

  const s = b.attempt_id
    ? await c('sessions').findOne({
        id: clean(b.attempt_id),
        exam_id: exam.id,
        user_id: uid(req.user)
      })
    : null;

  if (!s) return err(res, 409, 'Active exam session required');
  const previous = await c('results').findOne({ attempt_id: s.id, user_id: uid(req.user) });
  if (previous) {
    const participants = await c('results').countDocuments({ exam_id: exam.id });
    const rank = 1 + await c('results').countDocuments({ exam_id: exam.id, score: { $gt: previous.score } });
    return res.json({success:true,alreadySubmitted:true,score:previous.score,total:previous.total,percentage:previous.percentage,rank,participants,risk:previous.risk,whatsappAdminUrl:resultWhatsAppUrl(previous,rank,participants),message:'Result already saved'});
  }

  if (
    s.status !== 'active' ||
    s.expires_at.getTime() + 60000 < Date.now()
  ) {
    return err(res, 409, 'Active exam session required');
  }

  const qs = await c('questions').find({ exam_id: exam.id }).toArray();

  if (!qs.length) return err(res, 409, 'Exam has no questions');

  const answers = s.answers;
  let score = 0;
  let answered = 0;

  for (const q of qs) {
  if (/^[A-D]$/.test(answers[q.id] || '')) {
    answered++;

    if (answers[q.id] === q.correct_answer) {
      score += Number(q.marks) > 0 ? Number(q.marks) : 1;
    }
  }
}

const maximumMarks = qs.reduce(
  (sum, q) => sum + (Number(q.marks) > 0 ? Number(q.marks) : 1),
  0
);

  const result = {
    id: id(),
    attempt_id: s.id,
    user_id: uid(req.user),
    studentId: req.user.username,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    exam_id: exam.id,
    exam: exam.title,
    exam_key: clean(b.exam_key) || exam.id,
    score,
    total: maximumMarks,
	percentage: Number((score / maximumMarks * 100).toFixed(2)),
    risk: Math.min(100, Math.max(0, Number(b.risk) || 0)),
    riskTypes: b.riskTypes || {},
    created_at: new Date()
  };

  // Persist the result BEFORE finalizing the session. A failed insert must not
  // strand an attempt in the finished state with no result.
  // The unique results.attempt_id index arbitrates concurrent submissions.
  try {
    await c('results').insertOne(result);
  } catch (e) {
    if (e.code !== 11000) throw e;
    const existing = await c('results').findOne({attempt_id:s.id,user_id:uid(req.user)});
    if (!existing) throw e;
    const participants = await c('results').countDocuments({exam_id:exam.id});
    const rank = 1 + await c('results').countDocuments({exam_id:exam.id,score:{$gt:existing.score}});
    await c('sessions').updateOne({id:s.id,user_id:uid(req.user),status:'active'},{$set:{status:'finished',finished_at:new Date()}});
    return res.json({success:true,alreadySubmitted:true,score:existing.score,total:existing.total,percentage:existing.percentage,rank,participants,risk:existing.risk,whatsappAdminUrl:resultWhatsAppUrl(existing,rank,participants),message:'Result already saved'});
  }

  // If finalization fails transiently, the result is still durable and a
  // subsequent request returns it through the existing idempotency path.
  await c('sessions').updateOne(
    {id:s.id,user_id:uid(req.user),status:'active'},
    {$set:{status:'finished',finished_at:new Date()}}
  );

  const group = { exam_id: exam.id };
  const participants = await c('results').countDocuments(group);

  const rank = 1 + await c('results').countDocuments({
    ...group,
    score: { $gt: score }
  });

  try {
    await c('results').updateOne({id:result.id},{$set:{rank}});
    await c('completions').insertOne({
    id: id(),
    name: result.name,
    email: result.email,
    phone: result.phone,
    exam_title: exam.title,
    details: { ...result, rank, participants, answered },
    created_at: new Date()
    });
  } catch (auxError) {
    console.error('Result persisted; ancillary ranking/completion write failed',auxError);
  }

  const whatsappText = [
    'KCDHANUNJAY INFOSYS - Exam Result',
    `Student: ${result.name}`,
    `Student ID: ${result.studentId}`,
    `Exam: ${result.exam}`,
    `Score: ${result.score}/${result.total}`,
    `Percentage: ${result.percentage}%`,
    `Rank: ${rank} of ${participants}`
  ].join('\n');
  const whatsappAdminUrl = `https://wa.me/919494705353?text=${encodeURIComponent(whatsappText)}`;

  void sendResultEmails(result, rank, participants).catch(error => {
    console.error('Result notification dispatch failed:', error.message);
  });

  res.json({
    success: true,
    score,
    total: maximumMarks,
    percentage: result.percentage,
    rank,
    participants,
    risk: result.risk,
    whatsappAdminUrl,
    message: 'Result saved'
  });
}));

app.get('/api/results/admin/history',auth,admin,asyncRoute(async(req,res)=>{const rows=await c('results').find().sort({created_at:-1}).limit(100).toArray();const examIds=[...new Set(rows.map(r=>r.exam_id).filter(Boolean))];const scores=examIds.length?await c('results').find({exam_id:{$in:examIds}},{projection:{exam_id:1,score:1}}).toArray():[];const byExam=new Map();for(const r of scores){if(!byExam.has(r.exam_id))byExam.set(r.exam_id,[]);byExam.get(r.exam_id).push(Number(r.score)||0);}res.json({results:rows.map(r=>({studentId:r.studentId,exam:r.exam,score:r.score,percentage:r.percentage,rank:1+(byExam.get(r.exam_id)||[]).filter(score=>score>Number(r.score||0)).length,completedAt:r.created_at}))});}));
// Student-owned result history. Never trust a student ID supplied by the browser.
app.get('/api/results/my-history',auth,asyncRoute(async(req,res)=>{
  if(req.user.role!=='student')return err(res,403,'Student access required');
  const rows=await c('results').find({user_id:uid(req.user)}).sort({created_at:-1}).limit(100).toArray();
  const examIds=[...new Set(rows.map(r=>r.exam_id).filter(Boolean))];
  const all=examIds.length?await c('results').find({exam_id:{$in:examIds}},{projection:{exam_id:1,score:1}}).toArray():[];
  const scores=new Map();
  for(const r of all){if(!scores.has(r.exam_id))scores.set(r.exam_id,[]);scores.get(r.exam_id).push(Number(r.score)||0);}
  res.json({success:true,results:rows.map(r=>({
    id:r.id,exam:r.exam,score:r.score,total:r.total,percentage:r.percentage,
    rank:1+(scores.get(r.exam_id)||[]).filter(score=>score>Number(r.score||0)).length,
    completedAt:r.created_at
  }))});
}));
const fee=()=>{const n=Number(process.env.EXAM_FEE_INR||10);return Number.isFinite(n)&&n>=0?n:10;};
app.get('/api/payment/config',(req,res)=>res.json({amount:fee(),paymentPhone:process.env.PAYMENT_PHONE||'',upiId:process.env.PAYMENT_UPI_ID||''}));
app.post('/api/payment/notify',auth,upload.single('screenshot'),asyncRoute(async(req,res)=>{const reference=clean(req.body.reference).toUpperCase();if(!/^[A-Z0-9-]{8,40}$/.test(reference)||!req.file||!['image/png','image/jpeg','image/webp'].includes(req.file.mimetype))return err(res,400,'Valid UTR and image screenshot required');const key=paidKey(req.body.exam_type,req.body.mock);if(!key.exam_type)return err(res,400,'Exam type required');const p={id:id(),user_id:uid(req.user),name:req.user.name,email:req.user.email,exam_type:key.exam_type,mock:key.mock,exam_title:key.exam_type,amount:fee(),reference_id:reference,status:'created',screenshot:{data:req.file.buffer,contentType:req.file.mimetype},created_at:new Date()};try{await c('payments').insertOne(p);}catch(e){if(e.code===11000)return err(res,409,'This UTR has already been submitted');throw e;}res.status(201).json({success:true,message:'Submitted for manual verification. Exam remains locked until approval.'});}));
app.get('/api/payment/status',auth,asyncRoute(async(req,res)=>{const p=await c('payments').findOne({user_id:uid(req.user),...paidKey(req.query.type,req.query.mock)},{sort:{created_at:-1},projection:{screenshot:0}});const isPaid=await paid(req.user,req.query.type,req.query.mock);res.json({isPaid,payment:p?{...p,id:p.id}:null});}));
app.get('/api/payments/history',auth,asyncRoute(async(req,res)=>res.json({payments:await c('payments').find({user_id:uid(req.user)},{projection:{screenshot:0}}).sort({created_at:-1}).limit(100).toArray()})));
secure('/api/admin/payment-requests',async(req,res)=>{const rows=await c('payments').find({},{projection:{screenshot:0}}).sort({created_at:-1}).limit(200).toArray();res.json({payments:rows.map(p=>({...p,screenshot_url:`/api/admin/payment-requests/${encodeURIComponent(p.id)}/screenshot`}))});});
app.get('/api/admin/payment-requests/:id/screenshot',auth,admin,asyncRoute(async(req,res)=>{const p=await c('payments').findOne({id:req.params.id});if(!p?.screenshot)return err(res,404,'Screenshot not found');res.type(p.screenshot.contentType).send(p.screenshot.data.buffer?Buffer.from(p.screenshot.data.buffer):p.screenshot.data);}));
app.patch('/api/admin/payment-requests/:id',auth,admin,asyncRoute(async(req,res)=>{if(!['paid','failed'].includes(req.body.status))return err(res,400,'Status must be paid or failed');const p=await c('payments').findOne({id:req.params.id});if(!p)return err(res,404,'Payment not found');if(p.status!=='created')return err(res,409,'Payment already reviewed');const now=new Date();await c('payments').updateOne({id:p.id,status:'created'},{$set:{status:req.body.status,reviewed_at:now,reviewed_by:uid(req.user)}});await c('audit').insertOne({id:id(),created_at:now,actor:req.user.email,previous_status:p.status,new_status:req.body.status,amount:p.amount,reference_id:p.reference_id,note:'Manual review; verify transaction outside application'});res.json({success:true,message:'Payment reviewed'});}));
secure('/api/admin/revenue-summary',async(req,res)=>{const rows=await c('payments').find({},{projection:{screenshot:0}}).sort({created_at:-1}).limit(10000).toArray();res.json({approvedCount:rows.filter(p=>p.status==='paid').length,grossRevenue:rows.filter(p=>p.status==='paid').reduce((n,p)=>n+p.amount,0),pendingCount:rows.filter(p=>p.status==='created').length,rejectedCount:rows.filter(p=>p.status==='failed').length,recent:rows.slice(0,20)});});
secure('/api/admin/payment-audit',async(req,res)=>res.json({logs:await c('audit').find().sort({created_at:-1}).limit(100).toArray()}));
secure('/api/admin/database-summary',async(req,res)=>{const names=['users','exams','questions','sessions','results','payments','sample_leads','login_logs','alerts','completions'];res.json({databaseName:db.databaseName,collections:await Promise.all(names.map(async name=>({key:name,label:name,count:await c(name).countDocuments(),note:'MongoDB Atlas collection'})))});});
secure('/api/admin/students',async(req,res)=>{
  const us=await c('users').find({role:'student'}).sort({created_at:-1}).limit(500).toArray();
  const ids=us.map(uid);
  const payments=ids.length
    ? await c('payments').find(
        {user_id:{$in:ids},status:'paid'},
        {projection:{user_id:1,exam_type:1,mock:1,exam_title:1}}
      ).toArray()
    : [];
  const byUser=new Map();
  for(const p of payments){
    if(!byUser.has(p.user_id))byUser.set(p.user_id,[]);
    byUser.get(p.user_id).push({
      exam_type:p.exam_type,
      mock:p.mock,
      exam_title:p.exam_title
    });
  }
  res.json({
    total:await c('users').countDocuments({role:'student'}),
    students:us.map(u=>{
      const paid_exams=byUser.get(uid(u))||[];
      return {...cleanUser(u),is_paid:paid_exams.length>0,paid_exams};
    })
  });
});
app.post('/api/admin/students',auth,admin,asyncRoute(async(req,res)=>{const u=await createUser(req.body);res.status(201).json({success:true,student:cleanUser(u)});}));
app.patch('/api/admin/students/bulk-status',auth,admin,asyncRoute(async(req,res)=>{
  const b=req.body||{};
  const ids=b.student_ids;
  const active=b.is_active;

  if(!Array.isArray(ids)||ids.length<1||ids.length>100)
    return err(res,400,'Select 1 to 100 students');

  if(typeof active!=='boolean')
    return err(res,400,'is_active must be boolean');

  if(!ids.every(x=>typeof x==='string'&&ObjectId.isValid(x)))
    return err(res,400,'Invalid student ID');

  const uniqueIds=[...new Set(ids.map(x=>new ObjectId(x).toHexString()))];

  if(uniqueIds.length!==ids.length)
    return err(res,400,'Duplicate student IDs');

  const objectIds=uniqueIds.map(x=>new ObjectId(x));

  const students=await c('users').find({
    _id:{$in:objectIds},
    role:'student'
  }).project({_id:1}).toArray();

  if(students.length!==uniqueIds.length)
    return err(res,404,'One or more students not found');

  const now=new Date();

  const result=await c('users').updateMany({
    _id:{$in:objectIds},
    role:'student'
  },{
    $set:{is_active:active,updated_at:now}
  });

  try {
  await c('audit').insertOne({
    action:active?'students_bulk_enabled':'students_bulk_disabled',
    admin_id:uid(req.user),
    student_ids:uniqueIds,
    matched_count:result.matchedCount,
    modified_count:result.modifiedCount,
    created_at:now
  });
  } catch (auditError) {
    console.error('Bulk student audit logging failed:', auditError);
  }

  res.json({
    success:true,
    matched:result.matchedCount,
    modified:result.modifiedCount,
    is_active:active
  });
}));
app.patch('/api/admin/students/:id',auth,admin,asyncRoute(async(req,res)=>{if(!ObjectId.isValid(req.params.id))return err(res,400,'Invalid ID');const updates={};for(const field of ['name','email','phone'])if(req.body[field]!==undefined)updates[field]=clean(req.body[field]);if(updates.email)updates.email=updates.email.toLowerCase();if(updates.email&&!validEmail(updates.email)||updates.phone&&!validPhone(updates.phone))return err(res,400,'Invalid email or phone');if(typeof req.body.is_active==='boolean')updates.is_active=req.body.is_active;if(req.body.password){if(String(req.body.password).length<8)return err(res,400,'Password must be at least 8 characters');updates.passwordHash=await bcrypt.hash(req.body.password,12);}if(!Object.keys(updates).length)return err(res,400,'No changes');const result=await c('users').updateOne({_id:new ObjectId(req.params.id),role:'student'},{$set:updates,...(updates.passwordHash?{$inc:{tokenVersion:1}}:{})});if(!result.matchedCount)return err(res,404,'Student not found');res.json({success:true});}));
app.delete('/api/admin/students/:id',auth,admin,asyncRoute(async(req,res)=>{if(!ObjectId.isValid(req.params.id))return err(res,400,'Invalid ID');const result=await c('users').deleteOne({_id:new ObjectId(req.params.id),role:'student'});res.json({success:true,deleted:result.deletedCount});}));
for(const [route,collection,key] of [['sample-leads','sample_leads','leads'],['login-logs','login_logs','logs'],['cheating-alerts','alerts','alerts'],['exam-completions','completions','completions']]){secure(`/api/admin/${route}`,async(req,res)=>res.json({[key]:await c(collection).find().sort({created_at:-1}).limit(200).toArray()}));app.delete(`/api/admin/${route}`,auth,admin,asyncRoute(async(req,res)=>{await c(collection).deleteMany({});res.json({success:true});}));app.delete(`/api/admin/${route}/:id`,auth,admin,asyncRoute(async(req,res)=>{await c(collection).deleteOne({id:req.params.id});res.json({success:true});}));}
app.delete('/api/admin/dashboard-data',auth,admin,asyncRoute(async(req,res)=>{for(const name of ['login_logs','alerts','completions'])await c(name).deleteMany({});res.json({success:true});}));
app.post('/api/admin/test-response-mail',auth,admin,(req,res)=>err(res,501,'Email provider is not configured'));
secure('/api/admin/full-analytics',async(req,res)=>{const filter={};if(req.query.exam_id)filter.exam_id=clean(req.query.exam_id);if(/^\d{4}-\d{2}-\d{2}$/.test(req.query.date||'')){const d=new Date(req.query.date+'T00:00:00Z');filter.created_at={$gte:d,$lt:new Date(d.getTime()+86400000)};}const rows=await c('results').find(filter).sort({created_at:-1}).limit(5000).toArray();const bins=[0,0,0,0,0],counts=new Map();for(const r of rows){bins[Math.min(4,Math.floor(r.percentage/20))]++;counts.set(r.exam,(counts.get(r.exam)||0)+1);}res.json({analytics:{totalAttempts:rows.length},scoreDistribution:bins.map((value,i)=>({range:`${i*20}-${i===4?100:i*20+19}%`,value})),attemptsPerExam:[...counts].map(([exam_name,attempts])=>({exam_name,attempts})),topStudents:[...rows].sort((a,b)=>b.score-a.score).slice(0,10).map(r=>({name:r.name,score:r.score,exam:r.exam})),recentSubmissions:rows.slice(0,20).map(r=>({name:r.name,exam:r.exam,score:r.score,created_at:r.created_at}))});});
io.use(async(socket,next)=>{const u=await getUser(socket.handshake.auth?.token||'');if(!u)return next(new Error('Unauthorized'));socket.user=u;next();});
io.on('connection',socket=>{if(socket.user.role==='admin')socket.join('admins');socket.on('cheating-alert',async payload=>{if(socket.user.role!=='student')return;const alert={id:id(),user_id:uid(socket.user),name:socket.user.name,event_type:clean(payload?.type).slice(0,40),details:{type:clean(payload?.type).slice(0,40)},created_at:new Date()};await c('alerts').insertOne(alert);io.to('admins').emit('cheating-alert',{type:alert.event_type});});});
app.use('/api',(req,res)=>err(res,404,'API endpoint not found'));
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../frontend');app.use(express.static(root,{index:'index.html',dotfiles:'deny'}));
app.get('*',(req,res)=>res.sendFile(path.join(root,'index.html')));
app.use((e,req,res,next)=>{console.error(e);err(res,e.status|| (e.code==='LIMIT_FILE_SIZE'?413:500),e.status?e.message:'Request failed');});
http.listen(PORT,'0.0.0.0',()=>console.log(`KCDHANUNJAY frontend + API listening on ${PORT}`));
