import gql from 'graphql-tag';
import { applicationFormFragment } from './applicationQueries';

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
        ...ApplicationForm
      }
    }
  }
  ${applicationFormFragment}
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
