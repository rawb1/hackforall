const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-koa');

const Team = mongoose.model('Team');

const get = (hackathonId, name) =>
  Team.findOne({ name, hackathonId })
    .populate('members')
    .populate('applicants');

const getAll = hackathonId =>
  Team.find({ hackathonId })
    .populate('members')
    .populate('applicants');

const create = (hackathonId, name, userId) =>
  Team.create({ name, hackathonId, memberIds: [userId] });

const join = async (hackathonId, name, userId) =>
  Team.updateOne(
    { hackathonId, name },
    { $addToSet: { applicantIds: userId } }
  ).then(res => res.ok);

const recruit = async (hackathon, name, userId) => {
  const hackathonId = hackathon._id;
  const team = await Team.findOne({ name, hackathonId });
  if (team.memberIds.length >= hackathon.limit.team) {
    throw new ApolloError('Maximum team capacity reached');
  } else if (team.memberIds.include(userId)) {
    throw new ApolloError('Already a member');
  } else {
    const { ok } = await Team.updateOne(
      { hackathonId, name },
      { addToSet: { memberIds: userId }, $pull: { applicantIds: userId } }
    );
    return ok;
  }
};

const leave = async (hackathonId, name, userId) => {
  const { ok } = await Team.updateOne(
    { hackathonId, name },
    { $pull: { memberIds: userId, applicantIds: userId } }
  );
  Team.remove({ memberIds: { $exists: true, $ne: [] } });
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
