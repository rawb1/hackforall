const { gql } = require('apollo-server-koa');

const { teamController } = require('../../controllers');

const typeDefs = gql`
  type Team {
    _id: ID
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
    recruit(name: String!, userId: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    team: (parent, args, ctx, info) => {
      return teamController.get(ctx.state.hackathon._id, args.name);
    },
    teams: (parent, args, ctx, info) => {
      return teamController.getAll();
    }
  },
  Mutation: {
    createTeam: (parent, args, ctx) => {
      return teamController.create(
        ctx.state.hackathon._id,
        ctx.state.user._id,
        args.name
      );
    },
    joinTeam: (parent, args, ctx) => {
      return teamController.join(
        ctx.state.hackathon._id,
        ctx.state.user,
        args.name
      );
    },
    leaveTeam: (parent, args, ctx) => {
      return teamController.leave(
        ctx.state.hackathon._id,
        ctx.state.user._id,
        args.name
      );
    },
    recruit: (parent, args, ctx) => {
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
