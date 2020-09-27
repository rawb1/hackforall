const { gql } = require('apollo-server-koa');

const { hackerController } = require('../../controllers');

const typeDefs = gql`
  extend type Query {
    me: User
    hacker(id: ID!): User @auth(requires: ADMIN)
    hackers: [User] @auth(requires: ADMIN)
  }
`;

const resolvers = {
  Query: {
    me: (_, __, ctx) => ctx.state.user,
    hacker: (_, args, ctx) =>
      hackerController.findOne(args.id, ctx.state.hackathon.id),
    hackers: async (_, __, ctx) => {
      const t = await hackerController.find(ctx.state.hackathon.id);
      return t;
    }
  },
  Mutation: {}
};

module.exports = {
  typeDefs,
  resolvers
};
