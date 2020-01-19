const passport = require('koa-passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./strategies/local');
