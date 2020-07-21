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

  type Mutation @auth(requires: USER) {
    saveApplication(application: ApplicationInput!): Application
  }

  input ApplicationInput {
    name: String
    planing: {

    }
  }
`;

const resolvers = {
  Query: {
    getApplication: (parent, args, ctx, info) => {
      return hackathonController.get(ctx, args.id);
    }
  },
  Mutation: {
    saveApplication: (parent, args, ctx) => {
      return hackathonController.save(ctx, args.application);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
