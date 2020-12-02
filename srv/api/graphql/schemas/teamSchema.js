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
    team: (_, { name }, { state }) =>
      teamController.get(state.hackathon.id, name),
    teams: () => teamController.getAll()
  },
  Mutation: {
    createTeam: (_, { name }, { state }) =>
      teamController.create(state.hackathon.id, state.user.id, name),
    joinTeam: (_, { name }, { state }) =>
      teamController.join(state.hackathon.id, state.user, name),
    leaveTeam: (_, { name }, { state }) => {
      return teamController.leave(state.hackathon.id, state.user.id, name);
    },
    recruitTeammate: (_, { name, userId }, { state }) =>
      teamController.recruit(state.hackathon, state.user, name, userId)
  }
};

module.exports = {
  typeDefs,
  resolvers
};
