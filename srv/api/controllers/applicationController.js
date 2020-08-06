const mongoose = require('mongoose');

const Application = mongoose.model('Application');

const currentHackathon = { _id: '5f1c10546a4ffd305b0f25b0' };

const _parseFile = async file => {
  if (!file) {
    return;
  }
  const { filename: name, mimetype: type } = await file;
  // TODO handle file saving
  return { name, type };
};

const get = (user, id) => {
  if (id) {
    return Application.findById(id);
  } else {
    return Application.findOne({
      userId: user._id,
      hackathonId: currentHackathon._id
    });
  }
};

const apply = async (user, form) => {
  const application = await Application.findOne({
    userId: user._id,
    hackathonId: currentHackathon._id
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
      hackathonId: currentHackathon._id,
      form
    });
  }
};

module.exports = {
  get,
  apply
};
