const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: []
    }
  ],
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() }
});

TeamSchema.virtual('hack', {
  ref: 'Hack',
  localField: '_id',
  foreignField: 'teamId'
});

TeamSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

mongoose.model('Team', TeamSchema);
