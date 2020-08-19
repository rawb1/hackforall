const mongoose = require('mongoose');

const Hackathon = mongoose.model('Hackathon');

const get = id => Hackathon.findOne(id);

const getAll = () => Hackathon.find();

module.exports = {
  get,
  getAll
};
