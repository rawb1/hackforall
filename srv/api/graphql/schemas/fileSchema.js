const { gql } = require('apollo-server-koa');
const { GraphQLUpload } = require('graphql-upload');
const { fileController } = require('../../controllers');

const typeDefs = gql`
  scalar Upload

  type File {
    id: ID
    name: String
  }
`;

GraphQLUpload.parseValue = value => value && fileController.write(value);

const resolvers = {
  Upload: GraphQLUpload,
  ApplicationProfileForm: {
    resume: ({ _doc }) =>
      _doc.form.profile.resume && fileController.read(_doc.form.profile.resume)
  }
};

module.exports = {
  typeDefs,
  resolvers
};
