const { gql } = require('apollo-server-koa');

const { applicationController } = require('../../controllers');

const typeDefs = gql`
  enum ApplicationStatus {
    INCOMPLETE
    PENDING
    REFUSED
    ACCEPTED
  }

  type Application @auth(requires: USER) {
    _id: ID
    userId: ID
    hackathonId: ID
    form: ApplicationForm
    status: ApplicationStatus
  }

  extend type Query @auth(requires: USER) {
    application(id: ID): Application
  }

  extend type Mutation @auth(requires: USER) {
    apply(form: ApplicationFormInput!): Application
  }

  type ApplicationForm {
    name: String
    school: String
    phone: String
    garduationYear: String
    studyFields: [String]
    interests: [String]
    github: String
    resume: File
    dietaryRestrictions: [String]
    teeShirtSize: String
    needHardware: Boolean
    needAccomodation: Boolean
    needTravelReimbursement: Boolean
    hardwareList: [String]
    paypalAddress: String
    travelReceipt: File
    AccomodationPreferences: [String]
    hostMatchingDetails: String
    majority: Boolean
    liability: Boolean
    photoRelease: Boolean
    codeOfConduct: Boolean
    additionalNotes: String
  }

  input ApplicationFormInput {
    name: String!
    school: String!
    phone: String!
    garduationYear: String!
    studyFields: [String]!
    interests: [String]
    github: String
    resume: Upload
    dietaryRestrictions: [String]
    teeShirtSize: String!
    needHardware: Boolean
    needAccomodation: Boolean
    needTravelReimbursement: Boolean
    hardwareList: [String]
    paypalAddress: String
    travelReceipt: Upload
    AccomodationPreferences: [String]
    hostMatchingDetails: String
    majority: Boolean!
    liability: Boolean!
    photoRelease: Boolean!
    codeOfConduct: Boolean!
    additionalNotes: String
  }
`;

const resolvers = {
  Query: {
    application: (parent, args, ctx, info) => {
      return applicationController.get(args.id);
    }
  },
  Mutation: {
    apply: async (parent, args, ctx) => {
      return applicationController.apply(ctx.state.user, args.form);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
