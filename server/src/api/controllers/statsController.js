const mongoose = require('mongoose');
const _ = require('lodash');

const Application = mongoose.model('Application');
const Hackathon = mongoose.model('Hackathon');
const Team = mongoose.model('Team');
const User = mongoose.model('User');

const stats = async () =>
  _.zipObject(
    ['applications', 'users', 'hackathons', 'teams', 'date'],
    await Promise.all([
      Application.estimatedDocumentCount(),
      User.estimatedDocumentCount(),
      Hackathon.estimatedDocumentCount(),
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
