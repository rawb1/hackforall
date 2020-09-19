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

  type Application {
    id: ID
    userId: ID
    hackathonId: ID
    form: ApplicationForm
    files: FileUploads
    status: ApplicationStatus
    updatedAt: Date
  }

  type FileUploads {
    resume: File
    travelReceipt: File
  }

  extend type User {
    application: Application
  }

  extend type Query {
    application: Application
  }

  extend type Mutation {
    saveApplication(form: ApplicationFormInput!): Application
    cancelApplication(id: ID): Application
    acceptApplication(id: ID): Application @auth(requires: ADMIN)
    refuseApplication(id: ID): Application @auth(requires: ADMIN)
  }

  type ApplicationForm {
    name: String
    school: String
    phone: String
    garduationYear: String
    studyFields: [String]
    interests: [String]
    github: String
    dietaryRestrictions: [String]
    teeShirtSize: String
    needHardware: Boolean
    needAccomodation: Boolean
    needTravelReimbursement: Boolean
    hardwareList: [String]
    paypalAddress: String
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
  User: {
    application: (parent, _, ctx) =>
      parent.application || // prevent db refetch
      applicationController.findOne(ctx.state.hackathon.id, parent._id)
  },
  Query: {
    application: (_, __, ctx) =>
      applicationController.findOne(ctx.state.hackathon.id, ctx.state.user.id)
  },
  Mutation: {
    saveApplication: (parent, args, ctx) => {
      return applicationController.save(
        ctx.state.hackathon.id,
        ctx.state.user,
        args.form
      );
    },
    cancelApplication: (parent, args, ctx) => {
      return applicationController.cancel(args.id);
    },
    acceptApplication: (parent, args, ctx) => {
      return applicationController.accept(args.id);
    },
    refuseApplication: (parent, args, ctx) => {
      return applicationController.refuse(args.id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
