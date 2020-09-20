const mongoose = require('mongoose');
const _ = require('lodash');

const Application = mongoose.model('Application');

const findOne = (hackathonId, userId) =>
  Application.findOne({ hackathonId, userId });

const save = async (hackathonId, user, form) => {
  const files = _.omitBy(
    {
      resume: await form.resume,
      travelReceipt: await form.travelReceipt
    },
    _.isNil
  );

  if (user.application) {
    if (user.application.status === 'REFUSED') {
      return;
    }
    return Application.findByIdAndUpdate(
      user.application.id,
      {
        form,
        status: 'PENDING',
        files
      },
      { new: true }
    );
  } else {
    return Application.create({
      userId: user.id,
      hackathonId: hackathonId,
      form,
      files
    });
  }
};

const accept = id =>
  Application.findByIdAndUpdate(id, { status: 'ACCEPTED' }, { new: true });

const refuse = id =>
  Application.findByIdAndUpdate(id, { status: 'REFUSED' }, { new: true });

const cancel = (hackathonId, userId) =>
  Application.findAndUpdate(
    { hackathonId, userId },
    { status: 'CANCELED' },
    { new: true }
  );

module.exports = {
  findOne,
  save,
  accept,
  refuse,
  cancel
};
