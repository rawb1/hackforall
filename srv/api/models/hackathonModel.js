const mongoose = require('mongoose');

const fixtures = require('./utils/fixtures');

const Schema = mongoose.Schema;

const HackathonSchema = new Schema({
  name: { type: String, required: true },
  planning: {
    applicationOpen: { type: Date, required: true, default: new Date() },
    applicationClose: { type: Date, required: true, default: new Date() },
    start: { type: Date, required: true, default: new Date() },
    end: { type: Date, required: true, default: new Date() }
  },
  limits: {
    hackers: { type: Number, required: true, default: 200 },
    teamMembers: { type: Number, required: true, default: 5 },
    refund: { type: Number, required: true, default: 0 }
  },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

HackathonSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'hackathonId'
});

HackathonSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

HackathonSchema.virtual('open').get(function() {
  return (
    Date.now > this.planning.applicationOpen.getTime() &&
    Date.now < this.planning.applicationClose.getTime()
  );
});

HackathonSchema.virtual('live').get(function() {
  return (
    Date.now > this.planning.start.getTime() &&
    Date.now < this.planning.end.getTime()
  );
});

HackathonSchema.query.active = function() {
  return this.sort({ 'planning.start': -1 });
};

const Hackathon = mongoose.model('Hackathon', HackathonSchema);

fixtures.setDefault(Hackathon, { name: 'hackBdx' });
