const { gql } = require('apollo-server-koa');

const {
  register,
  login,
  logout,
  me
} = require('../../controllers/user.controller');

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
    me: User
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
    login: (parent, args, ctx, info) => {
      return login(ctx, args.user);
    },
    logout: (parent, args, ctx, info) => {
      return logout(ctx);
    },
    me: (parent, args, ctx, info) => {
      return me(ctx);
    }
  },
  Mutation: {
    register: (parent, args, ctx) => {
      return register(ctx, args.user);
    }
  }
};

module.exports = {
  User: typeDefs,
  UserResolvers: resolvers
};
