const mongoose = require('mongoose');
const _ = require('lodash');

const Application = mongoose.model('Application');
const Team = mongoose.model('Team');
const User = mongoose.model('User');

const stats = async () =>
  _.zipObject(
    ['applications', 'users', 'teams', 'date'],
    await Promise.all([
      Application.estimatedDocumentCount(),
      User.estimatedDocumentCount(),
      Team.estimatedDocumentCount(),
      new Date()
    ])
  );

const hackathonStats = async hackathonId =>
  _.zipObject(
    ['applications', 'hackers', 'teams', 'date'],
    await Promise.all([
      Application.countDocuments({ hackathonId }),
      Application.countDocuments({ hackathonId, status: 'ACCEPTED' }),
      Team.countDocuments({ hackathonId }),
      new Date()
    ])
  );

module.exports = {
  stats,
  hackathonStats
};
