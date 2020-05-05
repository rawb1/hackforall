const nodemailer = require('nodemailer');
const logger = require('koa-log4').getLogger('mailer');

// const env = require('./dotenv');
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: env.mailer.username,
//     pass: env.mailer.password
//   }
// });

const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail'
});

transporter.verify(err => {
  if (err) {
    logger.fatal(err.response);
    process.exit(1);
  }
  logger.info('nodemailer transport created successfuly');
});

const sendMail = transporter.sendMail;

module.exports = sendMail;
