const { gql } = require('apollo-server-koa');

const { sponsorController } = require('../../controllers');

const typeDefs = gql`
  type Sponsor {
    id: ID
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
      return sponsorController.find();
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
