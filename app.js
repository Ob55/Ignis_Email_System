// Load packages
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('./ignis_email_config.json');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const emailLogSchema = new mongoose.Schema({
  recipient: String,
  subject: String,
  body: String,
  status: String,       // 'sent' or 'failed'
  timestamp: { type: Date, default: Date.now }
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmailAndLog = async (receiver) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: receiver,
    subject: 'Weekly Report Reminder',
    text: config.message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${receiver}`);
    await EmailLog.create({ recipient: receiver, subject: mailOptions.subject, body: mailOptions.text, status: 'sent' });
  } catch (error) {
    console.error(`Failed to send to ${receiver}:`, error);
    await EmailLog.create({ recipient: receiver, subject: mailOptions.subject, body: mailOptions.text, status: 'failed' });
  }
};

const sendWeeklyEmail = async () => {
  for (const receiver of config.team_emails) {
    await sendEmailAndLog(receiver);
  }
};

const [hour, minute] = process.env.EMAIL_TIME.split(':');
const dayOfWeek = process.env.EMAIL_DAY;
const cronTime = `${minute} ${hour} * * ${dayOfWeek}`;

cron.schedule(cronTime, () => {
  console.log('Sending weekly emails...');
  sendWeeklyEmail();
});

console.log('Ignis MERN Emailing System is running...');
