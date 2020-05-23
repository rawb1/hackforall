import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query {
    me {
      username
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

export const REGISTER_MUTATION = gql`
  mutation($username: String, $email: String!, $password: String!) {
    register(
      user: { username: $username, email: $email, password: $password }
    ) {
      email
    }
  }
`;
