const config = require('dotenv').config();

if (config.error) {
  const logger = require('koa-log4').getLogger('config');
  logger.level = 'fatal';
  logger.fatal('.env file not found');
  process.exit(1);
}

module.exports = {
  isDev: (process.env.NODE_ENV || 'development') !== 'production',
  project: process.env.npm_package_name || 'hackforall',
  port: process.env.PORT,
  mongo: {
    uri: 'mongodb://localhost/graphql'
  },
  logs: 'log',
  mailer: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  secret: process.env.secret || 'shhhhh',
  playground: {
    settings: {
      'request.credentials': 'same-origin' // allow cookies
    }
  },
  sessionSettings: {
    renew: true
  }
};
