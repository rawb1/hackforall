const mongoose = require('mongoose');

const fixtures = require('./utils/fixtures');

const Schema = mongoose.Schema;

const HackathonSchema = new Schema({
  name: { type: String, required: true },
  dates: {
    applications: {
      open: { type: Date, required: true, default: new Date() },
      close: { type: Date, required: true, default: new Date() }
    },
    start: { type: Date, required: true, default: new Date() },
    end: { type: Date, required: true, default: new Date() }
  },
  limits: {
    hackers: { type: Number, required: true, default: 200 },
    team: { type: Number, required: true, default: 5 },
    refund: { type: Number, required: true, default: 0 }
  },
  active: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

HackathonSchema.index(
  { active: 1 },
  { unique: true, partialFilterExpression: { active: true } }
);

HackathonSchema.virtual('applications', {
  ref: 'Application',
  localField: 'id',
  foreignField: 'hackathonId'
});

HackathonSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

HackathonSchema.virtual('open').get(function() {
  return (
    Date.now > this.dates.applicationOpen.getTime() &&
    Date.now < this.dates.applicationClose.getTime()
  );
});

HackathonSchema.virtual('live').get(function() {
  return (
    Date.now > this.dates.start.getTime() && Date.now < this.dates.end.getTime()
  );
});

const Hackathon = mongoose.model('Hackathon', HackathonSchema);

fixtures.setDefault(Hackathon, { name: 'hackBdx' });
