const log4js = require('koa-log4');
const logger = log4js.getLogger('fixtures');

const setDefault = (model, fixture) => {
  const defaultDoc = model(fixture);

  model
    .findOne()
    .then(doc => {
      if (!doc) {
        return model.create(defaultDoc);
      }
    })
    .then(doc => {
      if (doc) {
        logger.info(`fixture for ${defaultDoc.constructor.modelName} created`);
      }
    });
};

module.exports = {
  setDefault
};
