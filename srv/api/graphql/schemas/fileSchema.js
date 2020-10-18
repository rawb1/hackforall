const { gql } = require('apollo-server-koa');
const { GraphQLUpload } = require('graphql-upload');
const fileController = require('../../controllers/fileController');
const userController = require('../../controllers/userController');

const typeDefs = gql`
  scalar Upload

  type File {
    name: String
    type: String
    bucket: String
  }

  extend type Mutation {
    getFileLink(bucket: String): String @auth(requires: USER)
    getUserFileLink(userId: ID, bucket: String): String @auth(requires: ADMIN)
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    getFileLink: (_, { bucket }, { state }) =>
      fileController.read(bucket, state.user),
    getUserFileLink: async (_, { bucket, userId }) =>
      fileController.read(bucket, await userController.findById(userId))
  }
};

module.exports = {
  typeDefs,
  resolvers
};
