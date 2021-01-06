const { gql } = require('apollo-server-koa');

const {
  hackathonController,
  applicationController
} = require('../../controllers');

const typeDefs = gql`
  directive @hackathon(requires: hackathonStatus!) on OBJECT | FIELD_DEFINITION

  enum hackathonStatus {
    APPLICATIONS_OPEN
    LIVE
  }

  type Hackathon {
    id: ID
    active: Boolean
    name: String
    dates: hackathonDates
    limits: hackathonLimits
    status: String
    createdAt: Date
    updatedAt: Date
  }

  type hackathonDates {
    applications: applicationsDates
    start: Date
    end: Date
  }

  type applicationsDates {
    open: Date
    close: Date
  }

  type hackathonLimits {
    hackers: Int
    team: Int
    refund: Float
  }

  extend type Query {
    hackathon: Hackathon
    hackathons: [Hackathon]
  }

  extend type Mutation {
    createHackathon(hackathon: HackathonInput!): Hackathon
    updateHackathon(hackathon: HackathonInput!): Hackathon
    cancelHackathon: Hackathon
    activateHackathon(id: ID): Hackathon
    deleteHackathon(id: ID): Boolean
  }

  input HackathonInput {
    id: ID
    active: Boolean
    name: String
    dates: hackathonDatesInput
    limits: hackathonLimitsInput
  }

  input hackathonDatesInput {
    applications: applicationsDatesInput
    start: Date
    end: Date
  }

  input applicationsDatesInput {
    open: Date
    close: Date
  }

  input hackathonLimitsInput {
    hackers: Int
    team: Int
    refund: Float
  }
`;

const resolvers = {
  Query: {
    hackathon: (_, __, { state }) => state.hackathon,
    hackathons: () => hackathonController.find()
  },
  Mutation: {
    createHackathon: (_, { hackathon }) =>
      hackathonController.create(hackathon),
    updateHackathon: (_, { hackathon }, { state }) =>
      hackathonController.update(state.hackathon.id, hackathon),
    cancelHackathon: (_, __, { state }) =>
      hackathonController.cancel(state.hackathon.id),
    activateHackathon: (_, { id }) => hackathonController.activate(id),
    deleteHackathon: async (_, { id }) => {
      await applicationController.deleteByHackathonId(id);
      return (await hackathonController.deleteOne(id)).deletedCount;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
