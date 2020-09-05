const log4js = require('koa-log4');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { UserInputError, ApolloError } = require('apollo-server-koa');
const { mailer } = require('../../config/mailer');
const { cookie, secret } = require('../../config/env');

const User = mongoose.model('User');
const logger = log4js.getLogger('user');

const _setCookie = (ctx, value, opts) => {
  ctx.cookies.set(cookie.name, value, Object.assign(cookie.attributes, opts));
};

/**
 * Authenticate user from cookie
 *
 * @param {*} ctx - context
 * @return {*} context
 */
const authenticate = async ctx => {
  try {
    const token = ctx.cookies.get(cookie.name);
    if (token) {
      const decoded = jwt.verify(token, secret);
      if (decoded) {
        ctx.state.user = await User.findOneHacker(
          decoded.sub,
          ctx.state.hackathon._id
        );
        if (decoded.remember) {
          _setCookie(ctx, token, {
            expires: new Date(Date.now() + cookie.expires)
          });
        }
      }
    }
  } catch (err) {
    logger.debug(err);
  }
  return ctx;
};

const register = async (ctx, args) => {
  let user = await User.findOne({
    $or: [{ email: args.email }, { username: args.username }]
  });
  if (user) {
    if (user.email === args.email) {
      throw new UserInputError('Email already used');
    } else {
      throw new UserInputError('Username already taken');
    }
  }
  ctx.state.user = user = await User.create(args);
  const token = jwt.sign({ sub: user._id }, secret);
  _setCookie(ctx, token);
  logger.info(`New user ${user.email}`);
  return user;
};

const login = async (ctx, args) => {
  const user = await User.findOne({ email: args.user.email });
  if (!user) {
    throw new UserInputError('Incorrect email or password');
  }
  const verified = await user.verifyPassword(args.user.password);
  if (!verified) {
    throw new UserInputError('Incorrect email or password');
  }
  ctx.state.user = user;
  const token = jwt.sign({ sub: user._id, remember: !!args.remember }, secret);
  const expires = args.remember ? new Date(Date.now() + cookie.expires) : false;
  _setCookie(ctx, token, { expires });
  return user;
};

const forgot = async (ctx, args) => {
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new UserInputError('User not found');
  }
  const resetToken = jwt.sign({ sub: user._id }, secret, {
    expiresIn: '1h'
  });
  const resetLink = `${ctx.origin}/reset/${resetToken}`;
  const mail = await mailer.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: 'bar@example.com, baz@example.com',
    subject: 'resetPassword',
    text: resetLink
    // html: '<b>Hello world?</b>' // html body
  });
  mailer.preview(mail);
  logger.debug(`Reset mail sent: ${mail.messageId}`);
  return user.email;
};

const reset = async (ctx, args) => {
  let decoded;
  try {
    decoded = jwt.verify(args.resetToken, secret);
  } catch (err) {
    throw new ApolloError(err.message, err.name);
  }
  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new UserInputError('User not found');
  }
  await user.resetPassword(args.newPassword);
  return true;
};

const logout = ctx => {
  const user = ctx.state.user;
  if (user) {
    _setCookie(ctx, null, { expires: Date.now() });
  }
  return !!user;
};

module.exports = {
  authenticate,
  forgot,
  login,
  logout,
  register,
  reset
};
