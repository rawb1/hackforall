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
const cookieSameSite = env.cookie.sameSite;

/**
 * Authenticate user from cookie
 *
 * @param {*} ctx - context
 * @return {*} context
 */
const authenticate = async cookies => {
  let user;
  try {
    const token = cookies.get(cookieName);
    if (token) {
      const decoded = JWT.verify(token, keystore);
      if (decoded) {
        user = await User.findById(decoded.sub);
        if (decoded.remember) {
          cookies.set(cookieName, token, {
            expires: new Date(Date.now() + cookieExpires),
            sameSite: cookieSameSite
          });
        }
      }
    }
  } catch (err) {
    logger.warning(err);
    logout(cookies);
  }
  return user;
};

const register = async (ctx, username, email, password) => {
  let user = await User.findOne({
    $or: [{ email }, { username }]
  });
  if (user) {
    if (user.email === email) {
      throw new UserInputError('Email already used');
    } else {
      throw new UserInputError('Username already taken');
    }
  }
  ctx.state.user = user = await User.create({ username, email, password });
  const token = JWT.sign({ sub: user.id }, keystore.get());
  ctx.cookies.set(cookieName, token, { sameSite: cookieSameSite });
  logger.info(`New user ${user.email}`);
  return user;
};

const login = async (ctx, username, email, password, remember) => {
  const user = await await User.findOne({
    $or: [{ email }, { username }]
  });
  if (!user) {
    throw new UserInputError('Incorrect email or password');
  }
  const verified = await user.verifyPassword(password);
  if (!verified) {
    throw new UserInputError('Incorrect email or password');
  }
  ctx.state.user = user;
  const token = JWT.sign({ sub: user.id, remember }, keystore.get());
  const expires = remember && new Date(Date.now() + cookieExpires);
  ctx.cookies.set(cookieName, token, { expires, sameSite: cookieSameSite });
  return user;
};

const forgot = async (origin, email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UserInputError('User not found');
  }
  const resetToken = JWT.sign({ sub: user.id }, keystore.get(), {
    expiresIn: '1h'
  });
  const resetLink = `${origin}/reset/${resetToken}`;
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

const logout = cookies =>
  cookies.set(cookieName, null, { expires: Date.now() });

module.exports = {
  authenticate,
  forgot,
  login,
  logout,
  register,
  reset,
  findById: User.findById
};
