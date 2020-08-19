const { gql } = require('apollo-server-koa');

const { hackerController } = require('../../controllers');

const typeDefs = gql`
  type HackerHistory {
    applications: [Application]
  }

  extend type User {
    application: Application
    history: HackerHistory
  }

  extend type Query @auth(requires: USER) {
    me: User
    hacker(id: ID!): User @auth(requires: ADMIN)
    hackers: [User] @auth(requires: ADMIN)
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, ctx, info) => {
      return ctx.state.user;
    },
    hacker: (parent, args, ctx, info) => {
      return hackerController.get(args.id, ctx.state.hackathon._id);
    },
    hackers: (parent, args, ctx, info) => {
      return hackerController.getAll(ctx.state.hackathon._id);
    }
  },
  Mutation: {}
};

module.exports = {
  typeDefs,
  resolvers
};
