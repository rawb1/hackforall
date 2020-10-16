const cacache = require('cacache');
const mongoose = require('mongoose');

const File = mongoose.model('File');

const { files } = require('../../config/env');

const path = files.local.path;
const adapter = 'local';

const write = async upload => {
  const { createReadStream, filename } = await upload;

  const stream = createReadStream();

  const file = await File.create({ name: filename, adapter });

  stream.pipe(cacache.put.stream(path, file.id));

  return file;
};

const read = File.findOne;

module.exports = {
  write,
  read
};
