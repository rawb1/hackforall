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
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

mongoose.model('Application', ApplicationSchema);
