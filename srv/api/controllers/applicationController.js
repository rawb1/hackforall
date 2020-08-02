const mongoose = require('mongoose');

const Application = mongoose.model('Application');

const currentHackathon = { _id: '5f1c10546a4ffd305b0f25b0' };

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
  const existingApplication = await Application.findOne({
    userId: user._id,
    hackathonId: currentHackathon._id
  });
  const { filename, mimetype, encoding } = await form.resume;
  form.resume = { filename, mimetype, encoding };
  if (existingApplication) {
    return Application.findByIdAndUpdate(existingApplication._id, {
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
