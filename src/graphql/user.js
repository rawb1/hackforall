import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query {
    me {
      username
    }
  }
`;

export const LOGIN_QUERY = gql`
  query($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      email
    }
  }
`;
