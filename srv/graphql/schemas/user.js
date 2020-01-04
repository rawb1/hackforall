const { gql } = require('apollo-server-koa');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const typeDefs = gql`
  type User {
    username: String
    password: String
  }
  extend type Query {
    getUser: [User]
  }
`;

const resolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      return User.find({});
    }
  }
};

module.exports = {
  User: typeDefs,
  UserResolvers: resolvers
};
