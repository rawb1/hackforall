const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-koa');

const Application = mongoose.model('Application');

const findOne = (hackathonId, userId) =>
  Application.findOne({ hackathonId, userId });

const create = (hackathonId, userId) =>
  Application.create({ hackathonId, userId });

const update = async (hackathonId, userId, form) => {
  form.profile.resume = await form.profile.resume.id;

  const application = await Application.findOne({ hackathonId, userId });

  if (!application) {
    throw new ApolloError('no application');
  }

  if (application.status === 'REFUSED') {
    throw new ApolloError('application refused');
  }

  return Application.findByIdAndUpdate(
    application.id,
    { form, status: 'PENDING' },
    { new: true }
  );
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
  create,
  update,
  accept,
  refuse,
  cancel
};
