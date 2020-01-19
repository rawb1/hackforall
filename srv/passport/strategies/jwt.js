const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');
const compose = require('koa-compose');
const { secret } = require('../../config');

const extractJwtFromCookie = ctx => {
  let token = null;
  if (ctx && ctx.cookies) {
    token = ctx.cookies.get('jwt');
  }
  return token;
};

const opts = {
  jwtFromRequest: extractJwtFromCookie,
  secretOrKey: secret
};

const User = mongoose.model('User');

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      return done(null, user);
    });
  })
);

async function setJwtCookie(ctx, next) {
  if (ctx.state.user) {
    const token = jwt.sign(JSON.stringify({ id: ctx.state.user._id }), secret);
    ctx.cookies.set('jwt', token, {
      httpOnly: true,
      secure: true,
      signed: true
    });
  }
  await next();
}

const jwt = compose([setJwtCookie]);

module.exports = jwt;
