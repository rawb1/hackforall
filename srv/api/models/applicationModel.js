const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    immutable: true
  },
  hackathonId: {
    type: Schema.Types.ObjectId,
    required: true,
    immutable: true
  },
  form: {
    type: Schema.Types.Mixed
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

ApplicationSchema.index({ userId: 1, hackathonId: 1 }, { unique: true });

ApplicationSchema.pre('updateOne', function() {
  this.set({ updatedAt: new Date() });
});

mongoose.model('Application', ApplicationSchema);
