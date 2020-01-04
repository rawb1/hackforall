const env = require('dotenv').config();

if (env.error) {
  const logger = require('koa-log4').getLogger('config');
  logger.level = 'fatal';
  logger.fatal('.env file not found');
  process.exit(1);
}

module.exports = {
  port: process.env.PORT,
  mongo: {
    uri: 'mongodb://localhost/graphql'
  },
  logs: 'log',
  emailConfig: {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
  }
};
