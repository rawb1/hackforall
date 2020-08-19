const { gql } = require('apollo-server-koa');
const { GraphQLUpload } = require('graphql-upload');
const GraphQLDate = require('graphql-date');

const typeDefs = gql`
  directive @auth(requires: Role!) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  scalar Upload
  scalar Date

  type File {
    name: String!
    type: String!
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
