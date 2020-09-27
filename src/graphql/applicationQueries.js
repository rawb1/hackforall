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

export const UPDATE_APPLICATION_MUTATION = gql`
  mutation($form: ApplicationFormInput!) {
    updateApplication(form: $form) {
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

export const CANCEL_APPLICATION_MUTATION = gql`
  mutation {
    cancelApplication(id: $id) {
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

export const ACCEPT_APPLICATION_MUTATION = gql`
  mutation($id: ID!) {
    acceptApplication(id: $id) {
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

export const REFUSE_APPLICATION_MUTATION = gql`
  mutation($id: ID!) {
    refuseApplication(id: $id) {
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
