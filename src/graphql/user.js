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
