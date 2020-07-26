const log4js = require('koa-log4');
const mongoose = require('mongoose');

const Application = mongoose.model('Application');
const logger = log4js.getLogger('application');

const get = () => {};
const save = (ctx, application) => {
  const user = ctx.state.user;
  logger.debug(`new application ! ${application}`);
  return Application.findOneAndUpdate(
    { userId: user._id },
    { userId: user._id, name: application.name }
  );
};

module.exports = {
  get,
  save
};
