const { gql } = require('apollo-server-koa');

const { applicationController } = require('../../controllers');

const typeDefs = gql`
  type Application {
    id: ID
    userId: ID
    hackathonId: ID
    form: ApplicationForm
    status: ApplicationStatus
    updatedAt: Date
  }

  enum ApplicationStatus {
    INCOMPLETE
    PENDING
    REFUSED
    ACCEPTED
    CANCELED
  }

  type ApplicationForm {
    profile: ApplicationProfileForm
    hosting: ApplicationHostingForm
    hardware: ApplicationHardwareForm
    travel: ApplicationTravelForm
    terms: ApplicationTermsForm
    additionalNotes: String
  }

  type ApplicationProfileForm {
    name: String
    school: String
    phone: String
    garduationYear: String
    studyFields: [String]
    interests: [String]
    github: String
    resume: File
    teeShirtSize: String
    dietaryRestrictions: [String]
    # additional informations
    needHardware: Boolean
    needHosting: Boolean
    needTravelReimbursement: Boolean
  }

  type ApplicationTermsForm {
    majority: Boolean
    liability: Boolean
    photoRelease: Boolean
    codeOfConduct: Boolean
  }

  type ApplicationHostingForm {
    HostingPreferences: [String]
    hostMatchingDetails: String
  }

  type ApplicationHardwareForm {
    hardwareList: [String]
  }

  type ApplicationTravelForm {
    paypalAddress: String
    travelReceipt: File
  }

  extend type User {
    application: Application
  }

  extend type Query {
    application: Application
  }

  extend type Mutation {
    createApplication: Application
    updateApplication(form: ApplicationFormInput!): Application
    cancelApplication: Application
    acceptApplication(id: ID): Application @auth(requires: ADMIN)
    refuseApplication(id: ID): Application @auth(requires: ADMIN)
  }

  input ApplicationFormInput {
    profile: ApplicationProfileFormInput
    hosting: ApplicationHostingFormInput
    hardware: ApplicationHardwareFormInput
    travel: ApplicationTravelFormInput
    terms: ApplicationTermsFormInput
    additionalNotes: String
  }

  input ApplicationProfileFormInput {
    name: String
    school: String
    phone: String
    garduationYear: String
    studyFields: [String]
    interests: [String]
    github: String
    resume: Upload
    teeShirtSize: String
    dietaryRestrictions: [String]
    # additional informations
    needHardware: Boolean
    needHosting: Boolean
    needTravelReimbursement: Boolean
  }

  input ApplicationTermsFormInput {
    majority: Boolean
    liability: Boolean
    photoRelease: Boolean
    codeOfConduct: Boolean
  }

  input ApplicationHostingFormInput {
    HostingPreferences: [String]
    hostMatchingDetails: String
  }

  input ApplicationHardwareFormInput {
    hardwareList: [String]
  }

  input ApplicationTravelFormInput {
    paypalAddress: String
    travelReceipt: Upload
  }
`;

const resolvers = {
  User: {
    application: (parent, _, ctx) =>
      ((parent.application.id = parent.application._id) &&
        parent.application) || // prevent db refetch + fix missing id field getter
      applicationController.findOne(ctx.state.hackathon.id, parent._id)
  },
  Query: {
    application: (_, __, ctx) =>
      applicationController.findOne(ctx.state.hackathon.id, ctx.state.user.id)
  },
  Mutation: {
    createApplication: (parent, args, ctx) => {
      return applicationController.create(
        ctx.state.hackathon.id,
        ctx.state.user.id
      );
    },
    updateApplication: (parent, args, ctx) => {
      return applicationController.update(
        ctx.state.hackathon.id,
        ctx.state.user.id,
        args.form
      );
    },
    cancelApplication: (_, __, { state }) =>
      applicationController.cancel(state.hackathon.id, state.user.id),
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
