const { gql } = require('apollo-server-koa');

const { hackathonController } = require('../../controllers');

const typeDefs = gql`
  directive @hackathon(requires: hackathonStatus!) on OBJECT | FIELD_DEFINITION

  enum hackathonStatus {
    OPEN
    LIVE
  }

  type hackathon {
    id: ID
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
