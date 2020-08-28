const { gql } = require('apollo-server-koa');

const { hackathonController } = require('../../controllers');

const typeDefs = gql`
  type hackathon {
    _id: ID
    name: ID
    planing: {
        applicationOpen: String
        applicationClose: String
        start: String
        end: String
    }
    open: Boolean
    live: Boolean
  }

  extend type Query  {
    hackathon(id: ID): hackathon
    hackathons: [hackathon]
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
