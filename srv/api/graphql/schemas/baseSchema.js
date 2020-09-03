const { gql } = require('apollo-server-koa');
const { GraphQLUpload } = require('graphql-upload');
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

  scalar Upload
  scalar Date

  type File {
    filename: String
    mimetype: String
    encoding: String
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Date: GraphQLDate
};

module.exports = {
  typeDefs,
  resolvers
};
