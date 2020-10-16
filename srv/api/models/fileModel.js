const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: { type: String, required: true },
  adapter: { type: String, required: true }
});

mongoose.model('File', FileSchema);
