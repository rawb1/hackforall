const { gql } = require('apollo-server-koa');

const { statsController } = require('../../controllers');

const typeDefs = gql`
  type Stats @auth(requires: ADMIN) {
    users: Int
    hackathons: Int
    applications: Int
    teams: Int
    hacks: Int
  }

  type HackathonStats {
    applications: Int
    hackers: Int
    teams: Int
    hacks: Int
  }

  extend type Query {
    stats: Stats @auth(requires: ADMIN)
    hackathonStats: HackathonStats
  }
`;

const resolvers = {
  Query: {
    stats: (parent, args, ctx, info) => {
      return statsController.stats();
    },
    hackathonStats: (parent, args, ctx, info) => {
      return statsController.hackathonStats();
    }
  },
  Mutation: {}
};

module.exports = {
  typeDefs,
  resolvers
};
