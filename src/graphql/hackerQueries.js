import gql from 'graphql-tag';

export const HACKERS_QUERY = gql`
  query {
    hackers {
      id
      username
      email
      application {
        updatedAt
        id
        status
        updatedAt
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
  }
`;

export const REGISTER_MUTATION = gql`
  mutation($username: String, $email: String!, $password: String!) {
    register(
      user: { username: $username, email: $email, password: $password }
    ) {
      email
    }
  }
`;

export const RESET_MUTATION = gql`
  mutation($newPassword: String!, $resetToken: String!) {
    reset(newPassword: $newPassword, resetToken: $resetToken)
  }
`;
