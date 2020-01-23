const { gql } = require('apollo-server-koa');
const log4js = require('koa-log4');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const logger = log4js.getLogger('user');

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
      try {
        const user = await User.findOne(args);
        const token = jwt.sign({ sub: user._id }, 'shhhhh');
        ctx.cookies.set('jwt', token);
        return user;
      } catch (err) {
        logger.debug(err);
        return null;
      }
    },
    logout: async (parent, args, ctx, info) => {
      ctx.cookies.set('jwt', { expires: Date.now() });
    }
  },
  Mutation: {
    register: async (parent, args, ctx) => {
      // const { username, password } = args.user;
      // const user = await User.register(new User({ username }), password);
      // return user;
    }
  }
};

module.exports = {
  User: typeDefs,
  UserResolvers: resolvers
};
