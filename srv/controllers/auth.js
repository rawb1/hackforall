const mongoose = require('mongoose');
const logger = require('koa-log4').getLogger('auth');

const User = mongoose.model('User');

const register = async (ctx, next) => {
  const opts = ctx.request.body;
  logger.debug('register', opts);
  let user;
  try {
    user = await User.register(
      new User({ username: opts.username }),
      opts.password
    );
  } catch (err) {
    logger.error('registration error', err.name, err.message);
    ctx.throw(400, err.name, err.message);
    next();
  }
  logger.info(`new user : ${user.username}`);
  ctx.body = user.username;
};

const login = async (ctx, next) => {
  const opts = ctx.request.body;
  logger.debug('login', opts);
  let user;
  try {
    user = await User.authenticate()(opts.username, opts.password);
  } catch (err) {
    logger.error('login error', err.name, err.message);
    ctx.throw(400, err.name, err.message);
    next();
  }
  ctx.body = user.username;
};

module.exports = {
  register,
  login
};
