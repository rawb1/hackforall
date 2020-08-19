const mongoose = require('mongoose');

const Team = mongoose.model('Team');

const get = (hackathonId, teamId) => Team.findOne({ _id: teamId, hackathonId });

const getAll = hackathonId => Team.find({ hackathonId });

const save = () => {};

module.exports = {
  get,
  getAll,
  save
};
