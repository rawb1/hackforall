const { gql } = require('apollo-server-koa');

const { hackathonController } = require('../../controllers');

const typeDefs = gql`
  type Hackathon {
    _id: ID
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
    updateHackathon(Hackathon: HackathonInput): Hackathon
    cancelHackathon: Hackathon
  }

  input HackathonInput {
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
    hackathons: (parent, args, ctx, info) => {
      return hackathonController.getAll();
    }
  },
  Mutation: {
    updateHackathon: (parent, args, ctx) => {
      return hackathonController.update(ctx.state.hackathon, args.hackathon);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
