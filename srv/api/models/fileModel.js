const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename: { type: String, required: true },
  mimetype: String,
  adapter: { type: String, required: true }
});

mongoose.model('File', FileSchema);
