const mongoose = require('mongoose');

const Hackathon = mongoose.model('Hackathon');

const findActive = () =>
  Hackathon.findOne().sort({ active: -1, updatedAt: -1 });

const find = () => Hackathon.find();

const create = hackathon => Hackathon.create(hackathon);

const update = (id, hackathon) =>
  Hackathon.findByIdAndUpdate(id, hackathon, { new: true });

const cancel = id =>
  Hackathon.findByIdAndUpdate(id, { active: false }, { new: true });

const activate = async id => {
  await Hackathon.updateMany({ _id: { $ne: id } }, { active: false });
  return Hackathon.findByIdAndUpdate(id, { active: true }, { new: true });
};

module.exports = {
  findActive,
  find,
  create,
  update,
  cancel,
  activate
};
