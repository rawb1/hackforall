const { gql } = require('apollo-server-koa');

const { userController } = require('../../controllers');

const typeDefs = gql`
  extend type User {
    application: Application
    team: Boolean
  }

  extend type Query {
    login(user: UserInput!, remember: Boolean = false): User
    logout: Boolean
    forgot(email: String!): String
    me: User @auth(requires: USER)
  }

  extend type Mutation {
    register(user: UserInput!): User
    reset(newPassword: String!, resetToken: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    login: (parent, args, ctx, info) => {
      return userController.login(ctx, args);
    },
    logout: (parent, args, ctx, info) => {
      return userController.logout(ctx);
    },
    forgot: (parent, args, ctx, info) => {
      return userController.forgot(ctx, args);
    },
    me: (parent, args, ctx, info) => {
      return userController.me(ctx);
    }
  },
  Mutation: {
    register: (parent, args, ctx) => {
      return userController.register(ctx, args.user);
    },
    reset: (parent, args, ctx) => {
      return userController.reset(ctx, args);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
