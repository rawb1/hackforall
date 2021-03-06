const { ApolloError } = require('apollo-server-koa');

const minioClient = require('../../config/minio');
const { minio } = require('../../config/env');

const write = async (upload, bucket, user) => {
  const file = await upload;
  const stream = file.createReadStream();

  await minioClient.putObject(
    bucket,
    `${user.id}_${user.username}-${user.email}.pdf`,
    stream
  );

  return { name: file.filename, type: file.mimetype, bucket };
};

const read = async (bucket, user) => {
  return new Promise(resolve => {
    const stream = minioClient.listObjectsV2(bucket, user.id);
    stream.on('error', err => {
      throw new ApolloError(err);
    });
    stream.on('data', async doc => {
      const name = `${bucket.slice(0, -1)}-${user.username}-${user.email}.pdf`;
      const link = await minioClient.presignedGetObject(bucket, doc.name, 10);
      resolve({ name, link });
    });
  });
};

const serverLink = () =>
  `${minio.ssl ? 'https' : 'http'}://${minio.endPoint}:${minio.port}/minio`;

module.exports = {
  write,
  read,
  serverLink
};
