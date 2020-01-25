const config = require('dotenv').config();

if (config.error) {
  const logger = require('koa-log4').getLogger('config');
  logger.level = 'fatal';
  logger.fatal('.env file not found');
  process.exit(1);
}

module.exports = {
  isDev: (process.env.NODE_ENV || 'development') !== 'production',
  port: process.env.PORT,
  mongo: {
    uri: 'mongodb://localhost/graphql'
  },
  logs: 'log',
  emailConfig: {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
  },
  secret: 'ssshhhhh',
  playground: {
    settings: {
      'request.credentials': 'same-origin' // allow cookies
    }
  }
};
