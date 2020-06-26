const log4js = require('koa-log4');
const env = require('./env');

const logger = () => {
  let categories;
  if (env.isDev) {
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
        filename: env.logs + '/access.log',
        pattern: '-yyyy-MM-dd',
        category: 'http'
      },
      app: {
        type: 'file',
        filename: env.logs + '/app.log',
        maxLogSize: 10485760,
        numBackups: 3
      },
      errorFile: {
        type: 'file',
        filename: env.logs + '/errors.log'
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
