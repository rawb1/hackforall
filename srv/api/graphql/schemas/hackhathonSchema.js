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
  }

  extend type Query @auth(requires: USER) {
    getHackathon(id: ID): hackathon
  }
`;

const resolvers = {
  Query: {
    getHackathon: (parent, args, ctx, info) => {
      return hackathonController.get(ctx, args.id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
