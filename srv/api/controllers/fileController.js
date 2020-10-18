const minioClient = require('../../config/minio');
const { minio } = require('../../config/env');

const _fileName = user => `${user.username}-${user.email}.pdf`;

const write = async (upload, bucket, user) => {
  const file = await upload;

  const stream = file.createReadStream();

  await minioClient.putObject(bucket, _fileName(user), stream);

  return { name: file.filename, type: file.mimetype, bucket };
};

const read = async (bucket, user) => {
  const name = `${bucket}-${_fileName(user)}`;
  const link = await minioClient.presignedGetObject(
    bucket,
    _fileName(user),
    10
  );
  return { name, link };
};

const serverLink = () =>
  `${minio.ssl ? 'https' : 'http'}://${minio.endPoint}:${minio.port}/minio`;

module.exports = {
  write,
  read,
  serverLink
};
