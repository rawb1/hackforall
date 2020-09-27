const cacache = require('cacache');
const mongoose = require('mongoose');

const File = mongoose.model('File');

const { files } = require('../../config/env');

const path = files.local.path;
const adapter = 'local';

const write = async upload => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();

  const file = await File.create({ filename, mimetype, adapter });

  stream.pipe(cacache.put.stream(path, file.id));

  return file;
};

module.exports = {
  write
};
