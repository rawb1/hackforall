const { gql } = require('apollo-server-koa');

const { teamController } = require('../../controllers');

const typeDefs = gql`
  type Team {
    _id: ID
    hackathonId: ID
    name: String
    members: [User]
  }

  extend type Query {
    team(id: ID): Team
    teams: [Team]
  }

  extend type Mutation {
    createTeam(name: String!): Team
    joinTeam(name: String!): Boolean
    leaveTeam(name: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    team: (parent, args, ctx, info) => {
      return teamController.get(args.id);
    },
    teams: (parent, args, ctx, info) => {
      return teamController.getAll();
    }
  },
  Mutation: {
    createTeam: (parent, args, ctx) => {
      return teamController.create(ctx, args.user);
    },
    joinTeam: (parent, args, ctx) => {
      return teamController.join(ctx, args);
    },
    leaveTeam: (parent, args, ctx) => {
      return teamController.leave(ctx, args);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
