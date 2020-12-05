const nodemailer = require('nodemailer');
const logger = require('koa-log4').getLogger('mailer');

const { mailer } = require('./env');

const transporter = nodemailer.createTransport({
  host: mailer.host,
  port: mailer.port,
  auth: {
    user: mailer.user,
    pass: mailer.pass
  }
});

// transporter.verify(err => {
//   if (err) {
//     logger.fatal(err.response);
//     process.exit(1);
//   }
//   logger.info('nodemailer transport created successfuly');
// });

transporter.preview = mail => {
  if (mailer.user.endsWith('@ethereal.email')) {
    logger.debug(nodemailer.getTestMessageUrl(mail));
  }
};

module.exports.mailer = transporter;
