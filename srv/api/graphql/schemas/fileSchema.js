const { gql } = require('apollo-server-koa');
const { GraphQLUpload } = require('graphql-upload');

const typeDefs = gql`
  scalar Upload

  type File {
    id: ID
    name: String
  }
`;

const resolvers = {
  Upload: GraphQLUpload
};

module.exports = {
  typeDefs,
  resolvers
};
