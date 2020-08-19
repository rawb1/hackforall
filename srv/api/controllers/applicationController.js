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
  const application = await Application.findOne({
    userId: user._id,
    hackathonId: hackathonId
  });

  form.resume = await _parseFile(form.resume);
  form.travelReceipt = await _parseFile(form.travelReceipt);

  if (application) {
    return Application.findByIdAndUpdate(application._id, {
      form
    });
  } else {
    return Application.create({
      userId: user._id,
      hackathonId: hackathonId,
      form
    });
  }
};

const accept = id => Application.updateById(id, { status: 'ACCEPTED' });

const refuse = id => Application.updateById(id, { status: 'REFUSED' });

const cancel = id => Application.updateById(id, { status: 'CANCELED' });

module.exports = {
  apply,
  accept,
  refuse,
  cancel
};
