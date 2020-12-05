const { makeExecutableSchema } = require('apollo-server-koa');
const { constraintDirective } = require('graphql-constraint-directive');

const logger = require('koa-log4').getLogger('graphql');

const generate = require('./utils/generate');
const { typeDefs, resolvers } = require('./schemas');
const schemaDirectives = require('./directives');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: { log: e => logger.error(e) },
  schemaDirectives,
  schemaTransforms: [constraintDirective()]
});

generate(schema);

module.exports = schema;
