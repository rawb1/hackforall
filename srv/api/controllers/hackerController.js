const mongoose = require('mongoose');

const User = mongoose.model('User');

const find = hackathonId =>
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

const findOne = async (userId, hackathonId) =>
  (
    await User.aggregate()
      .match({ _id: mongoose.Types.ObjectId(userId) })
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
      .unwind('$application')
  )[0];

module.exports = {
  find,
  findOne
};
