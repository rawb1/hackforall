const log4js = require('koa-log4');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-koa');
const User = mongoose.model('User');
const logger = log4js.getLogger('user');
const { mailer } = require('../../config/nodemailer');

const authenticate = async ({ ctx }) => {
  try {
    const cookie = ctx.cookies.get('jwt');
    if (cookie) {
      const token = jwt.verify(cookie, 'shhhhh');
      if (token) {
        ctx.state.user = await User.findOne({ _id: token.sub });
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
  const token = jwt.sign({ sub: user._id }, 'shhhhh');
  ctx.cookies.set('jwt', token);
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
  const token = jwt.sign({ sub: user._id }, 'shhhhh');
  const expires = args.remember
    ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    : false;
  ctx.cookies.set('jwt', token, { expires });
  return user;
};

const forgot = async (ctx, args) => {
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new UserInputError('Email not found');
  }

  const token = jwt.sign({ sub: user._id }, 'shhhhh', {
    expiresIn: '1h'
  });
  const resetLink = `${ctx.origin}/reset/${token}`;

  const mail = await mailer.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: 'bar@example.com, baz@example.com',
    subject: 'resetPassword',
    text: resetLink
    // html: '<b>Hello world?</b>' // html body
  });
  logger.debug(`Reset mail sent: ${mail.messageId}`);
  logger.debug('Preview URL: %s', mailer.preview(mail));
  return true;
};

const reset = async (ctx, args) => {
  const token = jwt.verify(args.resetToken, 'shhhhh');
  const user = await User.findOne({ _id: token.sub });
  if (user) {
    throw new UserInputError('Invalid token');
  }
  logger.info(`New user ${user.email}`);
  return user;
};

const logout = ctx => {
  const user = ctx.state.user;
  if (user) {
    ctx.cookies.set('jwt', null, { expires: Date.now() });
    return user;
  }
};

const me = ctx => {
  return ctx.state.user;
};

module.exports = {
  authenticate,
  register,
  login,
  logout,
  me,
  forgot,
  reset
};
