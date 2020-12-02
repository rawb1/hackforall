const { gql } = require('apollo-server-koa');

const { applicationController, fileController } = require('../../controllers');

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
    createApplication: Application @hackathon(requires: OPEN)
    updateApplication(form: ApplicationFormInput!): Application
      @hackathon(requires: OPEN)
    cancelApplication: Application @hackathon(requires: OPEN)
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
    application: (parent, _, { state }) =>
      ((parent.application.id = parent.application._id) &&
        parent.application) || // prevent db refetch + fix missing id field getter
      applicationController.findOne(state.hackathon.id, parent._id)
  },
  Query: {
    application: (_, __, { state }) =>
      applicationController.findOne(state.hackathon.id, state.user.id)
  },
  Mutation: {
    createApplication: (_, __, { state }) =>
      applicationController.create(state.hackathon.id, state.user.id),
    updateApplication: async (_, { form }, { state }) => {
      if ((await form.profile.resume).createReadStream) {
        form.profile.resume = await fileController.write(
          form.profile.resume,
          'resumes',
          state.user
        );
      }
      if ((await form.travel.travelReceipt).createReadStream) {
        form.travel.travelReceipt = await fileController.write(
          form.travel.travelReceipt,
          'travelreceipts',
          state.user
        );
      }
      return applicationController.update(state.hackathon.id, state.user, form);
    },
    cancelApplication: (_, __, { state }) =>
      applicationController.cancel(state.hackathon.id, state.user.id),
    acceptApplication: (_, { id }) => applicationController.accept(id),
    refuseApplication: (_, { id }) => applicationController.refuse(id)
  }
};

module.exports = {
  typeDefs,
  resolvers
};
