const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const fixtures = require('./utils/fixtures');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: false, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, default: 'USER' }
});

UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.verifyPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.resetPassword = function(newPassword) {
  this.password = newPassword;
  return this.save();
};

UserSchema.methods.hasRole = function(role) {
  return this.role === 'ADMIN' || this.role === role;
};

UserSchema.virtual('application', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'userId',
  justOne: true
});

UserSchema.static('findOneByHackathon', function(userId, hackathonId) {
  return this.findById(userId).populate({
    path: 'application',
    match: { hackathonId }
  });
});

const UserModel = mongoose.model('User', UserSchema);

fixtures.setDefault(UserModel, {
  username: 'admin',

  email: 'admin@mail.com',
  password: 'password',
  role: 'ADMIN'
});
