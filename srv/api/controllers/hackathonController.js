const mongoose = require('mongoose');

const Hackathon = mongoose.model('Hackathon');

const get = id => Hackathon.findOne(id);

const getCurrent = () => Hackathon.findOne().sort({ 'planning.start': -1 });

const getAll = () => Hackathon.find();

const save = () => {};

module.exports = {
  get,
  getCurrent,
  getAll,
  save
};
