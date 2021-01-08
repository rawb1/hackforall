const { gql } = require('apollo-server-koa');

const { statsController } = require('../../controllers');

const typeDefs = gql`
  type Stats @cacheControl(maxAge: 60000) {
    users: Int
    hackathons: Int
    applications: Int
    teams: Int
    hacks: Int
    date: Date
  }

  type HackathonStats @cacheControl(maxAge: 60000) {
    applications: Int
    hackers: Int
    teams: Int
    hacks: Int
    date: Date
  }

  extend type Query {
    stats: Stats
    hackathonStats: HackathonStats
  }
`;

const resolvers = {
  Query: {
    stats: () => statsController.stats(),
    hackathonStats: (_, __, { state }) =>
      statsController.hackathonStats(state.hackathon.id)
  },
  Mutation: {}
};

module.exports = {
  typeDefs,
  resolvers
};
