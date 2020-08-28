const mongoose = require('mongoose');

const Application = mongoose.model('Application');

// ? TODO move to custom file scalar
const _parseFile = async file => {
  if (!file) {
    return;
  }
  const { filename: name, mimetype: type } = await file;
  // TODO handle file saving
  return { name, type };
};

const apply = async (hackathonId, user, form) => {
  form.resume = await _parseFile(form.resume);
  form.travelReceipt = await _parseFile(form.travelReceipt);

  if (user.application) {
    if (user.application.status === 'REFUSED') {
      return;
    }
    return Application.findByIdAndUpdate(
      user.application._id,
      {
        form,
        status: 'PENDING'
      },
      { new: true }
    );
  } else {
    return Application.create({
      userId: user._id,
      hackathonId: hackathonId,
      form
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
