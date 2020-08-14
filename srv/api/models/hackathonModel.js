const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HackathonSchema = new Schema({
  name: { type: String, required: true },
  planning: {
    applicationOpen: { type: Date, required: true, default: new Date() },
    applicationClose: { type: Date, required: true, default: new Date() },
    start: { type: Date, required: true, default: new Date() },
    end: { type: Date, required: true, default: new Date() }
  },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

HackathonSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'userId'
});

HackathonSchema.pre('updateOne', function() {
  this.set({ updatedAt: new Date() });
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

mongoose.model('Hackathon', HackathonSchema);
