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
    me: (_, __, { state }) => state.user,
    hacker: (_, { id }, { state }) =>
      hackerController.findOne(id, state.hackathon.id),
    hackers: async (_, __, { state }) =>
      hackerController.find(state.hackathon.id)
  },
  Mutation: {}
};

module.exports = {
  typeDefs,
  resolvers
};
