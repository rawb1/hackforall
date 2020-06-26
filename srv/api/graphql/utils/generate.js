const { isDev } = require('../../../config/env');

const generate = async schema => {
  if (isDev) {
    const fs = require('fs');
    const path = require('path');
    const { promisify } = require('util');
    const { printSchema } = require('graphql');
    const logger = require('koa-log4').getLogger('graphql');

    const writeFile = promisify(fs.writeFile);
    const schemaDefs = printSchema(schema);
    const schemaDefsPath = path.join(__dirname, '../schema.graphql');

    try {
      await writeFile(schemaDefsPath, schemaDefs);
      logger.debug(`Schema generated in ${schemaDefsPath}`);
    } catch (err) {
      logger.error(`Schema generation error ${err}`);
    }
  }
};

module.exports = generate;
