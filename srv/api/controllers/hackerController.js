const mongoose = require('mongoose');

const User = mongoose.model('User');

const getAll = hackathonId =>
  User.aggregate()
    .lookup({
      from: 'applications',
      let: { userId: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$$userId', '$userId'] },
            hackathonId: mongoose.Types.ObjectId(hackathonId)
          }
        }
      ],
      as: 'application'
    })
    .unwind('$application');

const get = (userId, hackathonId) => User.findOneHacker(userId, hackathonId);

module.exports = {
  getAll,
  get
};
