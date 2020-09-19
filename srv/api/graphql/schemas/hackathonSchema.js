const { gql } = require('apollo-server-koa');

const { hackathonController } = require('../../controllers');

const typeDefs = gql`
  type Hackathon {
    id: ID
    active: Boolean
    name: String
    dates: hackathonDates
    limits: hackathonLimits
    open: Boolean
    live: Boolean
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
    hackathon: (parent, args, ctx, info) => {
      return ctx.state.hackathon;
    },
    hackathons: () => {
      return hackathonController.find();
    }
  },
  Mutation: {
    createHackathon: (_, args) => {
      return hackathonController.create(args.hackathon);
    },
    updateHackathon: (_, args, ctx) => {
      return hackathonController.update(ctx.state.hackathon.id, args.hackathon);
    },
    cancelHackathon: (_, __, ctx) => {
      return hackathonController.cancel(ctx.state.hackathon.id);
    },
    activateHackathon: (_, args) => {
      return hackathonController.activate(args.id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
