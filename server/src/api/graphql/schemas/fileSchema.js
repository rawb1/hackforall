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

  type FileLink {
    name: String
    link: String
  }

  extend type Query {
    filesLink: String @auth(requires: ADMIN)
    fileLink(bucket: String): FileLink @auth(requires: USER)
    userFileLink(userId: ID, bucket: String): FileLink @auth(requires: ADMIN)
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    filesLink: () => fileController.serverLink(),
    fileLink: (_, { bucket }, { state }) =>
      fileController.read(bucket, state.user),
    userFileLink: async (_, { bucket, userId }) =>
      fileController.read(bucket, await userController.findById(userId))
  }
};

module.exports = {
  typeDefs,
  resolvers
};
