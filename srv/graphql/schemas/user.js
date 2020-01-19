const { gql } = require('apollo-server-koa');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const typeDefs = gql`
  directive @auth(requires: Role!) on FIELD_DEFINITION

  enum Role {
    ADMIN
    OWNER
    USER
  }

  type User {
    _id: ID
    username: String!
    name: String
    role: Role!
  }

  extend type Query {
    login(user: UserInput): User
    logout: User
  }

  type Mutation {
    register(user: UserInput): User
  }

  input UserInput {
    username: String
    password: String
  }
`;

const resolvers = {
  Query: {
    login: async (parent, args, ctx, info) => {
      const { username, password } = args.user;
      const { user } = await User.authenticate()(username, password);
      await ctx.login(user);
      return user;
    },
    logout: async (parent, args, ctx, info) => {
      ctx.logout();
    }
  },
  Mutation: {
    register: async (parent, args, ctx) => {
      const { username, password } = args.user;
      const user = await User.register(new User({ username }), password);
      return user;
    }
  }
};

module.exports = {
  User: typeDefs,
  UserResolvers: resolvers
};
