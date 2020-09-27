const { gql } = require('apollo-server-koa');
const GraphQLDate = require('graphql-date');

const typeDefs = gql`
  directive @auth(requires: Role!) on OBJECT | FIELD_DEFINITION

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on OBJECT | FIELD_DEFINITION

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  enum Role {
    ADMIN
    USER
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
