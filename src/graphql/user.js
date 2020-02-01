import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query {
    me {
      username
    }
  }
`;

export const LOGIN_QUERY = gql`
  query {
    ogin(user: { username: "robin", password: "proqrobi" })
  }
`;
