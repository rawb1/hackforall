const { gql } = require('apollo-server-koa');

const { applicationController } = require('../../controllers');

const typeDefs = gql`
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
    diet: ApplicationDietForm
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
    teeShirtSize: String
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
  }

  type ApplicationDietForm {
    dietaryRestrictions: [String]
  }

  extend type User {
    application: Application
  }

  extend type Query {
    application: Application
  }

  extend type Mutation {
    saveApplication(form: ApplicationFormInput!): Application
    cancelApplication: Application
    acceptApplication(id: ID): Application @auth(requires: ADMIN)
    refuseApplication(id: ID): Application @auth(requires: ADMIN)
  }

  input ApplicationFormInput {
    profile: ApplicationProfileFormInput
    hosting: ApplicationHostingFormInput
    hardware: ApplicationHardwareFormInput
    diet: ApplicationDietFormInput
    travel: ApplicationTravelFormInput
    terms: ApplicationTermsFormInput
    additionalNotes: String
  }

  input ApplicationProfileFormInput {
    name: String
    school: String
    phone: String
    garduationYear: String
    resume: Upload
    studyFields: [String]
    interests: [String]
    github: String
    teeShirtSize: String
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

  input ApplicationDietFormInput {
    dietaryRestrictions: [String]
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
