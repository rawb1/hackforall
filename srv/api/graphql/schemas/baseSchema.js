const { gql } = require('apollo-server-koa');
const GraphQLUpload = require('graphql-upload/public/GraphQLUpload');

const typeDefs = gql`
  directive @auth(requires: Role!) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Upload: GraphQLUpload
};

module.exports = {
  typeDefs,
  resolvers
};
