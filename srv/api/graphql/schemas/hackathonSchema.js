const { gql } = require('apollo-server-koa');

const { hackathonController } = require('../../controllers');

const typeDefs = gql`
  type Hackathon {
    _id: ID
    name: String
    planing: hackathonPlaning
    open: Boolean
    live: Boolean
  }

  type hackathonPlaning {
    applicationOpen: Date
    applicationClose: Date
    start: Date
    end: Date
  }

  extend type Query @auth(requires: USER) {
    hackathon(id: ID): Hackathon
    hackathons: [Hackathon]
  }
`;

const resolvers = {
  Query: {
    hackathon: (parent, args, ctx, info) => {
      return hackathonController.get(args.id);
    },
    hackathons: (parent, args, ctx, info) => {
      return hackathonController.getAll();
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
