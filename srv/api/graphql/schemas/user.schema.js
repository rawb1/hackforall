const { gql } = require('apollo-server-koa');

const {
  register,
  login,
  logout,
  me
} = require('../../controllers/user.controller');

const typeDefs = gql`
  type User @auth(requires: USER) {
    _id: ID @auth(requires: ADMIN)
    username: String!
    role: Role! @auth(requires: ADMIN)
  }

  extend type Query {
    login(user: UserInput): Boolean
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
