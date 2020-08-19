const mongoose = require('mongoose');

const Hackathon = mongoose.model('Hackathon');

const getActive = async ctx => {
  ctx.state.hackathon = await Hackathon.findOne().active();
  return ctx;
};

const get = id => Hackathon.findOne(id);

const getAll = () => Hackathon.find();

const save = () => {};

module.exports = {
  get,
  getActive,
  getAll,
  save
};
