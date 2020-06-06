import gql from 'graphql-tag';

export const CONNECTED_QUERY = gql`
  query {
    connected @client
  }
`;

export const CONNECT_MUTATION = gql`
  mutation {
    connect @client
  }
`;

export const DISCONNECT_MUTATION = gql`
  mutation {
    disconnect @client
  }
`;

export const ME_QUERY = gql`
  query {
    me {
      email
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

export const FORGOT_QUERY = gql`
  query($email: String!) {
    forgot(email: $email)
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
