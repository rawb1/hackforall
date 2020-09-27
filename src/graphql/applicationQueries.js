import gql from 'graphql-tag';

export const APPLICATION_QUERY = gql`
  query {
    application {
      id
      userId
      hackathonId
      status
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
  }
`;

export const CREATE_APPLICATION_MUTATION = gql`
  mutation {
    createApplication {
      id
      userId
      hackathonId
      status
    }
  }
`;

export const UPDATE_APPLICATION_MUTATION = gql`
  mutation($form: ApplicationFormInput!) {
    updateApplication(form: $form) {
      id
      status
    }
  }
`;

export const CANCEL_APPLICATION_MUTATION = gql`
  mutation {
    cancelApplication(id: $id) {
      id
      status
    }
  }
`;

export const ACCEPT_APPLICATION_MUTATION = gql`
  mutation($id: ID!) {
    acceptApplication(id: $id) {
      id
      status
    }
  }
`;

export const REFUSE_APPLICATION_MUTATION = gql`
  mutation($id: ID!) {
    refuseApplication(id: $id) {
      id
      status
    }
  }
`;
