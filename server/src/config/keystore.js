const { JWK, JWKS } = require('jose');
const logger = require('koa-log4').getLogger('keystore');

const { secrets } = require('./env');

if (!Array.isArray(secrets)) {
  logger.fatal('Secrets must be provided.');
  process.exit(1);
}

const keystore = new JWKS.KeyStore(secrets.map(secret => JWK.asKey(secret)));

module.exports = keystore;
