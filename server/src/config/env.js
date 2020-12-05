require('dotenv').config();

const dev = process.env.NODE_ENV || 'development';

module.exports = {
  dev,
  mongo: {
    uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    user:process.env.MONGO_USER,
    pass:process.env.MONGO_PASS
  },
  minio: {
    endPoint: process.env.MINIO_HOST,
    port: Number(process.env.MINIO_PORT),
    useSSL: !dev,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
  },
  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  },
  secrets: process.env.JWT_SECRETS.split(','),
  cookie: {
    name: process.env.COOKIE_NAME,
    expires: process.env.COOKIE_EXPIRES * 1000,
    sameSite: true
  },
  playground: {
    settings: {
      'schema.polling.enable': true,
      'request.credentials': 'include' // allow cookies
    }
  }
};
