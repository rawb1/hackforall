const mongoose = require('mongoose');

const Hackathon = mongoose.model('Hackathon');

const get = id => {
  if (id) {
    Hackathon.findOne(id);
  } else {
    Hackathon.findOne().sort({ 'planning.start': -1 });
  }
};

const getAll = () => Hackathon.find();

const save = () => {};

module.exports = {
  get,
  getAll,
  save
};
