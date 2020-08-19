const { gql } = require('apollo-server-koa');

const { applicationController } = require('../../controllers');

const typeDefs = gql`
  enum ApplicationStatus {
    INCOMPLETE
    PENDING
    REFUSED
    ACCEPTED
    CANCELED
  }

  type Application @auth(requires: USER) {
    _id: ID
    userId: ID
    hackathonId: ID
    form: ApplicationForm
    status: ApplicationStatus
    updatedAt: Date
  }

  extend type Query @auth(requires: USER) {
    application(id: ID): Application
  }

  extend type Mutation @auth(requires: USER) {
    apply(form: ApplicationFormInput!): Application
    cancel(id: ID): Application
    accept(id: ID): Application @auth(requires: ADMIN)
    refuse(id: ID): Application @auth(requires: ADMIN)
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
      return ctx.state.user.application;
    }
  },
  Mutation: {
    apply: async (parent, args, ctx) => {
      return applicationController.apply(
        ctx.state.hackathon._id,
        ctx.state.user,
        args.form
      );
    },
    cancel: async (parent, args, ctx) => {
      return applicationController.cancel(args.id);
    },
    accept: async (parent, args, ctx) => {
      return applicationController.accept(args.id);
    },
    refuse: async (parent, args, ctx) => {
      return applicationController.refuse(args.id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
