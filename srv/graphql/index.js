const { gql, makeExecutableSchema } = require('apollo-server-koa');
const { merge } = require('lodash');
const logger = require('koa-log4').getLogger('graphql');

const { User, UserResolvers } = require('./schemas/user.js');

const Query = gql`
  type Query {
    _empty: String
  }
`;
const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(resolvers, UserResolvers),
  logger
});

module.exports = schema;
