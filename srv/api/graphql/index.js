const { makeExecutableSchema } = require('apollo-server-koa');
const { merge } = require('lodash');
const log4js = require('koa-log4');

const logger = log4js.getLogger('graphql');

const generate = require('./utils/generate');
const { baseSchema, userSchema, applicationSchema } = require('./schemas');
const AuthDirective = require('./directives/authDirective');

const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema.typeDefs,
    userSchema.typeDefs,
    applicationSchema.typeDefs
  ],
  resolvers: merge(
    baseSchema.resolvers,
    userSchema.resolvers,
    applicationSchema.resolvers
  ),
  logger: { log: e => logger.debug(e) },
  schemaDirectives: {
    auth: AuthDirective
  }
});

generate(schema);

module.exports = schema;
