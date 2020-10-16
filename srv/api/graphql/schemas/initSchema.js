const { gql } = require('apollo-server-koa');
const GraphQLDate = require('graphql-date');

const typeDefs = gql`
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on OBJECT | FIELD_DEFINITION

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Date: GraphQLDate
};

module.exports = {
  typeDefs,
  resolvers
};
