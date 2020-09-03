const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  hackathonId: {
    type: Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true,
    immutable: true
  },
  form: {
    // TODO implement form struct
    type: Schema.Types.Mixed,
    required: true
  },
  files: {
    // TODO implement form struct
    type: Schema.Types.Mixed,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['INCOMPLETE', 'PENDING', 'REFUSED', 'ACCEPTED', 'CANCELED'],
    default: 'PENDING'
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

ApplicationSchema.index({ userId: 1, hackathonId: 1 }, { unique: true });

ApplicationSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

mongoose.model('Application', ApplicationSchema);
