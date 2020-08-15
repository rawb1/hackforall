const { gql } = require('apollo-server-koa');

const { userController, hackathonController } = require('../../controllers');

const typeDefs = gql`
  type User @auth(requires: USER) {
    _id: ID @auth(requires: ADMIN)
    username: String!
    email: String! @constraint(format: "email")
    role: Role!
    applications: [Application]
  }

  extend type Query {
    login(user: UserInput!, remember: Boolean = false): User
    logout: Boolean
    forgot(email: String!): String
    me: User @auth(requires: USER)
    users: [User] @auth(requires: ADMIN)
    hackers: [User] @auth(requires: ADMIN)
  }

  extend type Mutation {
    register(user: UserInput!): User
    reset(newPassword: String!, resetToken: String!): Boolean
  }

  input UserInput {
    username: String
    email: String! @constraint(format: "email")
    password: String!
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
    },
    users: (parent, args, ctx, info) => {
      return userController.getAll();
    },
    hackers: (parent, args, ctx, info) => {
      return hackathonController
        .getCurrent()
        .then(currentHackathon =>
          userController.getHackers(currentHackathon.id)
        );
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
