const { gql } = require('apollo-server-koa');

const { teamController } = require('../../controllers');

const typeDefs = gql`
  type Team {
    id: ID
    hackathonId: ID
    name: String
    members: [User]
    applicants: [User]
  }

  extend type User {
    team: Team
  }

  extend type Query {
    team(name: String): Team
    teams: [Team]
  }

  extend type Mutation {
    createTeam(name: String!): Team
    joinTeam(name: String!): Boolean
    leaveTeam(name: String!): Boolean
    recruitTeammate(name: String!, userId: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    team: (parent, args, ctx, info) => {
      return teamController.get(ctx.state.hackathon.id, args.name);
    },
    teams: (parent, args, ctx, info) => {
      return teamController.getAll();
    }
  },
  Mutation: {
    createTeam: (parent, args, ctx) => {
      return teamController.create(
        ctx.state.hackathon.id,
        ctx.state.user.id,
        args.name
      );
    },
    joinTeam: (parent, args, ctx) => {
      return teamController.join(
        ctx.state.hackathon.id,
        ctx.state.user,
        args.name
      );
    },
    leaveTeam: (parent, args, ctx) => {
      return teamController.leave(
        ctx.state.hackathon.id,
        ctx.state.user.id,
        args.name
      );
    },
    recruitTeammate: (parent, args, ctx) => {
      return teamController.recruit(
        ctx.state.hackathon,
        ctx.state.user,
        args.name,
        args.userId
      );
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
