const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  hackathonId: {
    type: Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true,
    immutable: true
  },
  memberIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  applicantIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

TeamSchema.index({ name: 1, hackathonId: 1 }, { unique: true });

TeamSchema.virtual('hack', {
  ref: 'Hack',
  localField: '_id',
  foreignField: 'teamId'
});

TeamSchema.virtual('members', {
  ref: 'User',
  localField: 'memberIds',
  foreignField: '_id'
});

TeamSchema.virtual('applicants', {
  ref: 'User',
  localField: 'applicantIds',
  foreignField: '_id'
});

TeamSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

TeamSchema.post(['updateOne', 'findOneAndUpdate'], function(docs) {
  // eslint-disable-next-line no-console
  console.log(this);
});

mongoose.model('Team', TeamSchema);
