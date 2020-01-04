const process = require('process');
const logger = require('koa-log4').getLogger('mongoose');
const mongoose = require('mongoose');
const config = require('../config');

require('./schema/user');
require('./schema/info');
require('./schema/student');
require('./schema/course');

const database = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
    mongoose.set('debug', (collectionName, method, query, doc, options) => {
      logger.debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });
  }
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.connect(config.DB_PATH);
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.DB_PATH);
  });
  mongoose.connection.on('error', err => {
    logger.fatal(err);
  });

  mongoose.connection.on('open', () => {
    logger.info('Connected to MongoDB ', config.DB_PATH);
  });
};

database();
