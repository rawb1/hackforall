const env = require('./env');
const Minio = require('minio');
const logger = require('koa-log4').getLogger('file');

const minioClient = new Minio.Client(env.minio);

(async () => {
  try {
    if (!(await minioClient.bucketExists('resumes'))) {
      await minioClient.makeBucket('resumes');
    }
    if (!(await minioClient.bucketExists('travelreceipts'))) {
      await minioClient.makeBucket('travelreceipts');
    }
  } catch (err) {
    logger.fatal(err);
    process.exit(1);
  }
})();

module.exports = minioClient;
