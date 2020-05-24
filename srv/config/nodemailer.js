const nodemailer = require('nodemailer');
const logger = require('koa-log4').getLogger('mailer');

const { isDev, mailer } = require('./dotenv');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: mailer.user,
    pass: mailer.pass
  }
});

transporter.verify(err => {
  if (err) {
    logger.fatal(err.response);
    process.exit(1);
  }
  logger.info('nodemailer transport created successfuly');
});

transporter.preview = mail => {
  return isDev ? nodemailer.getTestMessageUrl(mail) : null;
};

module.exports.mailer = transporter;
