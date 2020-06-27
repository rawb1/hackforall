const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HackathonSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true, default: Date.now },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

mongoose.model('Hackathon', HackathonSchema);
