const log4js = require('koa-log4');
const config = require('../config');

const logger = () => {
  let categories;
  if (process.env.NODE_ENV !== 'production') {
    categories = {
      default: { appenders: ['console'], level: 'DEBUG' },
      http: { appenders: ['console'], level: 'DEBUG' }
    };
  } else {
    categories = {
      default: { appenders: ['app', 'errors'], level: 'INFO' },
      http: { appenders: ['access'], level: 'INFO' }
    };
  }

  log4js.configure({
    appenders: {
      access: {
        type: 'dateFile',
        filename: config.LOG_FOLDER + '/access.log',
        pattern: '-yyyy-MM-dd',
        category: 'http'
      },
      app: {
        type: 'file',
        filename: config.LOG_FOLDER + '/app.log',
        maxLogSize: 10485760,
        numBackups: 3
      },
      errorFile: {
        type: 'file',
        filename: config.LOG_FOLDER + '/errors.log'
      },
      errors: {
        type: 'logLevelFilter',
        level: 'ERROR',
        appender: 'errorFile'
      },
      console: {
        type: 'console'
      }
    },
    categories: categories
  });
};

logger();
