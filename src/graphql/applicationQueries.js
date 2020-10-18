import gql from 'graphql-tag';

export const applicationFormFragment = gql`
  fragment ApplicationForm on Application {
    form {
      profile {
        school
        name
        phone
        garduationYear
        studyFields
        interests
        github
        resume {
          name
          bucket
        }
        teeShirtSize
        needHardware
        needHosting
        needTravelReimbursement
        dietaryRestrictions
      }
      hosting {
        HostingPreferences
        hostMatchingDetails
      }
      hardware {
        hardwareList
      }
      travel {
        paypalAddress
        travelReceipt {
          name
          bucket
        }
      }
      terms {
        majority
        liability
        photoRelease
        codeOfConduct
      }
      additionalNotes
    }
  }
`;

export const APPLICATION_QUERY = gql`
  query {
    application {
      id
      userId
      hackathonId
      status
      ...ApplicationForm
    }
  }
  ${applicationFormFragment}
`;

export const CREATE_APPLICATION_MUTATION = gql`
  mutation {
    createApplication {
      id
      userId
      hackathonId
      status
      ...ApplicationForm
    }
  }
  ${applicationFormFragment}
`;

export const UPDATE_APPLICATION_MUTATION = gql`
  mutation($form: ApplicationFormInput!) {
    updateApplication(form: $form) {
      id
      userId
      hackathonId
      status
      ...ApplicationForm
    }
  }
  ${applicationFormFragment}
`;

export const CANCEL_APPLICATION_MUTATION = gql`
  mutation {
    cancelApplication {
      id
      userId
      hackathonId
      status
      ...ApplicationForm
    }
  }
  ${applicationFormFragment}
`;

export const ACCEPT_APPLICATION_MUTATION = gql`
  mutation($id: ID!) {
    acceptApplication(id: $id) {
      id
      userId
      hackathonId
      status
      ...ApplicationForm
    }
  }
  ${applicationFormFragment}
`;

export const REFUSE_APPLICATION_MUTATION = gql`
  mutation($id: ID!) {
    refuseApplication(id: $id) {
      id
      userId
      hackathonId
      status
      ...ApplicationForm
    }
  }
  ${applicationFormFragment}
`;
