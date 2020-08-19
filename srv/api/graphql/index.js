const { makeExecutableSchema } = require('apollo-server-koa');
const { constraintDirective } = require('graphql-constraint-directive');
const log4js = require('koa-log4');

const logger = log4js.getLogger('graphql');

const generate = require('./utils/generate');
const { typeDefs, resolvers } = require('./schemas');
const AuthDirective = require('./directives/authDirective');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: { log: e => logger.error(e) },
  schemaDirectives: {
    auth: AuthDirective
  },
  schemaTransforms: [constraintDirective()]
});

generate(schema);

module.exports = schema;
