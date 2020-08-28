const { gql } = require('apollo-server-koa');

const { sponsorController } = require('../../controllers');

const typeDefs = gql`
  type Sponsor {
    _id: ID
    hachathonId: ID
    name: String
  }

  extend type Query {
    sponsor(id: ID): Sponsor
    sponsors: [Sponsor]
  }
`;

const resolvers = {
  Query: {
    sponsor: (parent, args, ctx, info) => {
      return sponsorController.get();
    },
    sponsors: (parent, args, ctx, info) => {
      return sponsorController.getAll();
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
