const minioClient = require('../../config/minio');

const _fileName = user => `${user.username}-${user.email}.pdf`;

const write = async (upload, bucket, user) => {
  const file = await upload;
  const stream = file.createReadStream();

  await minioClient.putObject(bucket, _fileName(user), stream);

  return { name: file.filename, type: file.mimetype, bucket };
};

const read = (bucket, user) =>
  minioClient.presignedGetObject(bucket, _fileName(user), 60);

module.exports = {
  write,
  read
};
