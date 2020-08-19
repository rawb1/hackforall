import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query {
    me {
      username
      email
      role
    }
  }
`;

export const LOGIN_QUERY = gql`
  query($email: String!, $password: String!, $remember: Boolean) {
    login(user: { email: $email, password: $password }, remember: $remember) {
      email
    }
  }
`;

export const LOGOUT_QUERY = gql`
  query {
    logout
  }
`;

export const FORGOT_QUERY = gql`
  query($email: String!) {
    forgot(email: $email)
  }
`;

export const HACKERS_QUERY = gql`
  query {
    hackers {
      _id
      username
      email
      application {
        _id
        status
        updatedAt
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
