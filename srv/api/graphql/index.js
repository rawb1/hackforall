const { gql, makeExecutableSchema } = require('apollo-server-koa');

const { merge } = require('lodash');
const generate = require('./utils/generate');
const log4js = require('koa-log4');

const logger = log4js.getLogger('graphql');

const { User, UserResolvers } = require('./schemas/user.schema');
const AuthDirective = require('./directives/authDirective');

const Query = gql`
  directive @auth(requires: Role!) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  type Query {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(UserResolvers),
  logger: { log: e => logger.debug(e) },
  schemaDirectives: {
    auth: AuthDirective
  }
});

generate(schema);

module.exports = schema;
