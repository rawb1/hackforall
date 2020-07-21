const { gql } = require('apollo-server-koa');

const { applicationController } = require('../../controllers');

const typeDefs = gql`
  type Application @auth(requires: USER) {
    _id: ID
    userId: ID
    hackathonId: ID
  }

  extend type Query @auth(requires: USER) {
    getApplication(id: ID): Application
  }

  extend type Mutation @auth(requires: USER) {
    saveApplication(application: ApplicationInput!): Application
  }

  input ApplicationInput {
    name: String
    school: String
    phone: String
    garduationYear: String
    studyFields: [String]
    interests: [String]
    github: String
    resume: Upload
    dietaryRestrictions: [String]
    teeShirtSize: String
    needHardware: Boolean
    needAccomodation: Boolean
    needTravelReimbursement: Boolean
    hardwareList: [String]
    paypalAddress: String
    travelReceipt: Upload
    AccomodationPreferences: [String]
    hostMatchingDetails: String
    majority: Boolean
    liability: Boolean
    photoRelease: Boolean
    codeOfConduct: Boolean
    additionalNotes: String
  }
`;

const resolvers = {
  Query: {
    getApplication: (parent, args, ctx, info) => {
      return applicationController.get(ctx, args.id);
    }
  },
  Mutation: {
    saveApplication: (parent, args, ctx) => {
      return applicationController.save(ctx, args.application);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
