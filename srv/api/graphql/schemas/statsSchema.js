const { gql } = require('apollo-server-koa');

const { statsController } = require('../../controllers');

const typeDefs = gql`
  type Stats @cacheControl(maxAge: 300) {
    users: Int
    hackathons: Int
    applications: Int
    teams: Int
    hacks: Int
  }

  type HackathonStats @cacheControl(maxAge: 300) {
    applications: Int
    hackers: Int
    teams: Int
    hacks: Int
  }

  extend type Query {
    stats: Stats
    hackathonStats: HackathonStats
  }
`;

const resolvers = {
  Query: {
    stats: (parent, args, ctx, info) => {
      return statsController.stats();
    },
    hackathonStats: (parent, args, ctx, info) => {
      return statsController.hackathonStats(ctx.state.hackathon.id);
    }
  },
  Mutation: {}
};

module.exports = {
  typeDefs,
  resolvers
};
