const mongoose = require('mongoose');
const { ValidationError, ForbiddenError } = require('apollo-server-koa');
const Application = require('koa');

const Team = mongoose.model('Team');

const get = (hackathonId, name) =>
  Team.findOne({ name, hackathonId })
    .populate('members')
    .populate('applicants');

const getAll = hackathonId =>
  Team.find({ hackathonId })
    .populate('members')
    .populate('applicants');

const create = async (hackathonId, userId, name) =>
  Team.create({ name, hackathonId, memberIds: [userId] });

const join = async (hackathonId, user, name) => {
  const userId = user.id;
  if (user.team) {
    throw new ValidationError('You are already in a Team');
  }
  const { ok } = await Team.updateOne(
    { hackathonId, name, memberIds: userId },
    { $addToSet: { applicantIds: userId } }
  );
  return ok;
};

const recruit = async (hackathon, user, name, recruitId) => {
  if (user.team.name !== name || !user.team.hackathonId.equals(hackathon.id)) {
    throw new ForbiddenError('You are not in the Team');
  }
  if (user.team.memberIds.length >= hackathon.limits.team) {
    throw new ForbiddenError('Team is full');
  }

  const recruit = await Application.findOne({
    userId: recruitId,
    hackathonId: hackathon.id
  });

  if (!recruit) {
    throw new ValidationError('This hacker does not exist');
  }
  if (recruit.team) {
    throw new ValidationError('This hacker is already in a team');
  }

  const { ok } = await Team.updateOne(
    {
      hackathonId: hackathon.id,
      name,
      memberIds: user.id,
      $where: `this.memberIds.length < ${hackathon.limits.team}`
    },
    { $addToSet: { memberIds: recruitId }, $pull: { applicantIds: recruitId } }
  );
  return ok;
};

const leave = async (hackathonId, userId, name) => {
  const { ok } = await Team.updateOne(
    { hackathonId, name },
    { $pull: { memberIds: userId, applicantIds: userId } }
  );
  Team.remove({ hackathonId, memberIds: { $eq: [] } });
  return ok;
};

module.exports = {
  get,
  getAll,
  create,
  join,
  recruit,
  leave
};
