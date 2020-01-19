const { gql, makeExecutableSchema } = require('apollo-server-koa');
const { merge } = require('lodash');
const generate = require('./utils/generate');
const logger = require('koa-log4').getLogger('graphql');

const { User, UserResolvers } = require('./schemas/user.js');
const AuthDirective = require('./directives/AuthDirective');

const Query = gql`
  type Query {
    _empty: String
  }
`;

const directiveResolvers = {
  auth: AuthDirective
};

const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(UserResolvers),
  logger,
  directiveResolvers
});

generate(schema);

module.exports = schema;
