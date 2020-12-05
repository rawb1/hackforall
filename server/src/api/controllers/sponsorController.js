const mongoose = require('mongoose');

const Hackathon = mongoose.model('Hackathon');

const get = id => Hackathon.findOne(id);

const find = () => Hackathon.find();

module.exports = {
  get,
  find
};
