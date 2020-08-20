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

// TODO fix me
ApplicationSchema.pre('updateOne', function() {
  if (!this.isModified('status')) {
    this.set({ status: 'PENDING' });
  }
  this.set({ updatedAt: new Date() });
});

mongoose.model('Application', ApplicationSchema);
