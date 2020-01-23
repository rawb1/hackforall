const logger = require('koa-log4').getLogger('mongoose');
const mongoose = require('mongoose');
const env = require('./dotenv');

const database = () => {
  if (env.isDev) {
    mongoose.set('debug', true);
    mongoose.set('debug', (collectionName, method, query, doc, options) => {
      logger.debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });
  }
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.connect(env.mongo.uri).catch(err => {
    logger.fatal(`${err.name} :  ${err.message}`);
    process.exit(1);
  });
  mongoose.connection.on('disconnected', () => {
    logger.warn('Disconnected fom MongoDB ', env.mongo.uri);
  });
  mongoose.connection.on('reconnected', () => {
    logger.info('Reconnected to MongoDB ', env.mongo.uri);
  });
  mongoose.connection.on('error', err => {
    logger.err(`${err.name} :  ${err.message}`);
  });
  mongoose.connection.on('open', () => {
    logger.info('Connected to MongoDB ', env.mongo.uri);
  });
};

database();
