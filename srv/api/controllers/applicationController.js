const mongoose = require('mongoose');
const _ = require('lodash');

const Application = mongoose.model('Application');

const apply = async (hackathonId, user, form) => {
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
      user.application._id,
      {
        form,
        status: 'PENDING',
        files
      },
      { new: true }
    );
  } else {
    return Application.create({
      userId: user._id,
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

const cancel = id =>
  Application.findByIdAndUpdate(id, { status: 'CANCELED' }, { new: true });

module.exports = {
  apply,
  accept,
  refuse,
  cancel
};
