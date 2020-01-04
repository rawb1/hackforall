const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('koa-log4').getLogger('mailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailConfig.username,
    pass: config.emailConfig.password
  }
});

transporter.verify(err => {
  if (err) {
    logger.fatal(err);
    process.exit(1);
  }
  logger.info('nodemailer transport created successfuly');
});

const sendMail = transporter.sendMail;

module.exports = sendMail;
