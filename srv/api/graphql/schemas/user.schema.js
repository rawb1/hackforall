const { gql } = require('apollo-server-koa');

const {
  register,
  login,
  logout,
  me,
  reset,
  forgot
} = require('../../controllers/user.controller');

const typeDefs = gql`
  type User @auth(requires: USER) {
    _id: ID @auth(requires: ADMIN)
    username: String!
    email: String!
    role: Role! @auth(requires: ADMIN)
  }

  extend type Query {
    login(user: UserInput!, remember: Boolean = false): User
    logout: Boolean
    forgot(email: String!): String
    me: User @auth(requires: USER)
  }

  type Mutation {
    register(user: UserInput!): User
    reset(newPassword: String!, resetToken: String!): Boolean
  }

  input UserInput {
    username: String
    email: String!
    password: String!
  }
`;

const resolvers = {
  Query: {
    login: (parent, args, ctx, info) => {
      return login(ctx, args);
    },
    logout: (parent, args, ctx, info) => {
      return logout(ctx);
    },
    forgot: (parent, args, ctx, info) => {
      return forgot(ctx, args);
    },
    me: (parent, args, ctx, info) => {
      return me(ctx);
    }
  },
  Mutation: {
    register: (parent, args, ctx) => {
      return register(ctx, args.user);
    },
    reset: (parent, args, ctx) => {
      return reset(ctx, args);
    }
  }
};

module.exports = {
  User: typeDefs,
  UserResolvers: resolvers
};
