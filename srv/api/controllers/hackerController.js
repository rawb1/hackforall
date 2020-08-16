const mongoose = require('mongoose');

const User = mongoose.model('User');

const getAllByHackathon = async hackathonId =>
  User.aggregate().lookup({
    from: 'applications',
    let: { userId: '$_id' },
    pipeline: [
      {
        $match: {
          $and: [
            { $expr: { $eq: ['$$userId', '$userId'] } },
            { hackathonId: mongoose.Types.ObjectId(hackathonId) }
          ]
        }
      }
    ],
    as: 'application'
  });

module.exports = {
  getAllByHackathon
};
