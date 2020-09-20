const { UserInputError, ApolloError } = require('apollo-server-koa');
const mongoose = require('mongoose');
const { JWT } = require('jose');

const { mailer } = require('../../config/mailer');
const env = require('../../config/env');
const keystore = require('../../config/keystore');

const User = mongoose.model('User');
const logger = require('koa-log4').getLogger('user');
const cookieName = env.cookie.name;
const cookieExpires = env.cookie.expires;

/**
 * Authenticate user from cookie
 *
 * @param {*} ctx - context
 * @return {*} context
 */
const authenticate = async ctx => {
  let user;
  try {
    const token = ctx.cookies.get(cookieName);
    if (token) {
      const decoded = JWT.verify(token, keystore);
      if (decoded) {
        user = await User.findById(decoded.sub);
        if (decoded.remember) {
          ctx.cookies.set(cookieName, token, {
            expires: new Date(Date.now() + cookieExpires)
          });
        }
      }
    }
  } catch (err) {
    logger.warning(err);
    logout(ctx);
  }
  return user;
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
  const token = JWT.sign({ sub: user.id }, keystore.get());
  ctx.cookies.set(cookieName, token);
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
  const token = JWT.sign(
    { sub: user.id, remember: !!args.remember },
    keystore.get()
  );
  const expires = args.remember ? new Date(Date.now() + cookieExpires) : false;
  ctx.cookies.set(cookieName, token, { expires });
  return user;
};

const forgot = async (ctx, args) => {
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new UserInputError('User not found');
  }
  const resetToken = JWT.sign({ sub: user.id }, keystore.get(), {
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
    decoded = JWT.verify(args.resetToken, keystore);
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
    ctx.cookies.set(cookieName, null, { expires: Date.now() });
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
