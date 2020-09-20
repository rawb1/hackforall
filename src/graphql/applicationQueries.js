import gql from 'graphql-tag';

export const APPLICATION_QUERY = gql`
  query {
    application {
      id
      userId
      hackathonId
      status
      form {
        name
        school
        phone
        garduationYear
        studyFields
        interests
        github
        dietaryRestrictions
        teeShirtSize
        needHardware
        needHosting
        needTravelReimbursement
        hardwareList
        paypalAddress
        HostingPreferences
        hostMatchingDetails
        majority
        liability
        photoRelease
        codeOfConduct
        additionalNotes
      }
      files {
        resume {
          filename
        }
        travelReceipt {
          filename
        }
      }
    }
  }
`;

export const APPLY_MUTATION = gql`
  mutation($applicationForm: ApplicationFormInput) {
    saveApplication(form: $applicationForm) {
      status
    }
  }
`;

export const CANCEL_MUTATION = gql`
  mutation {
    cancelApplication(id: $id) {
      status
    }
  }
`;

export const ACCEPT_MUTATION = gql`
  mutation($id: ID!) {
    acceptApplication(id: $id) {
      status
    }
  }
`;

export const REFUSE_MUTATION = gql`
  mutation($id: ID!) {
    refuseApplication(id: $id) {
      status
    }
  }
`;
