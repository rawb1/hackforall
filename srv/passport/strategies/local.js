const passport = require('koa-passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(User.createStrategy());
