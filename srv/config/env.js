const config = require('dotenv').config();

if (config.error) {
  const logger = require('koa-log4').getLogger('config');
  logger.level = 'fatal';
  logger.fatal('.env file not found');
  process.exit(1);
}

const project = process.env.npm_package_name || 'hackforall';
const dev = (process.env.NODE_ENV || 'development') !== 'production';

module.exports = {
  project,
  dev,
  port: process.env.PORT,
  logs: 'log',
  mongo: {
    uri: `mongodb://localhost/${project}`
  },
  minio: {
    endPoint: 'localhost',
    port: 9000,
    useSSL: !dev,
    accessKey: 'hackforall',
    secretKey: 'hackforall'
  },
  mailer: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  secrets: process.env.SECRETS || ['shhhhh'],
  cookie: {
    name: process.env.COOKIE_NAME || project,
    expires: process.env.COOKIE_EXPIRES || Number(1000 * 60 * 60 * 24 * 7),
    sameSite: true
  },
  playground: {
    settings: {
      'schema.polling.enable': false,
      'request.credentials': 'include' // allow cookies
    }
  }
};
