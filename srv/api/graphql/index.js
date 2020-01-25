const { gql, makeExecutableSchema } = require('apollo-server-koa');
const { merge } = require('lodash');
const generate = require('./utils/generate');
const log4js = require('koa-log4');

const logger = log4js.getLogger('graphql');

const { User, UserResolvers } = require('./schemas/user.schema');
const authDirective = require('./directives/authDirective');

const Query = gql`
  type Query {
    _empty: String
  }
`;

const directiveResolvers = {
  auth: authDirective
};

const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(UserResolvers),
  logger: { log: e => logger.debug(e) },
  directiveResolvers
});

generate(schema);

module.exports = schema;
