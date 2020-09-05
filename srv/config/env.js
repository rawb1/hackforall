const config = require('dotenv').config();

if (config.error) {
  const logger = require('koa-log4').getLogger('config');
  logger.level = 'fatal';
  logger.fatal('.env file not found');
  process.exit(1);
}

const project = process.env.npm_package_name || 'hackforall';

module.exports = {
  project,
  dev: (process.env.NODE_ENV || 'development') !== 'production',
  port: process.env.PORT,
  mongo: {
    uri: `mongodb://localhost/${project}`
  },
  logs: 'log',
  mailer: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  secret: process.env.secret || 'shhhhh',
  cookie: {
    name: process.env.COOKIE_NAME || 'cookie',
    keys: process.env.COOKIE_KEYS.split(',') || 'shhhhh',
    expires: 1000 * 60 * 60 * 24 * 7,
    attributes: {
      path: '',
      domain: '',
      sameSite: 'lax',
      secure: false
    }
  },
  playground: {
    settings: {
      'schema.polling.enable': false,
      'request.credentials': 'include' // allow cookies
    }
  },
  sessionSettings: {
    renew: true
  }
};
