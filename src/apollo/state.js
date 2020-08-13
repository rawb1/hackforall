import gql from 'graphql-tag';
import { ME_QUERY } from '@/graphql/userQueries';

export const typeDefs = gql`
  type Mutation {
    connected(connected: Boolean): Boolean
  }
`;

export const CONNECTED_QUERY = gql`
  query {
    connected @client
  }
`;

export const CONNECTED_MUTATION = gql`
  mutation($connected: Boolean) {
    connected(connected: $connected) @client
  }
`;

export const resolvers = {
  Mutation: {
    connected: (_, { connected }, { cache }) => {
      cache.writeQuery({
        query: CONNECTED_QUERY,
        data: {
          connected
        }
      });
    }
  }
};

export const initializeState = async client => {
  const isConnected = await client
    .query({ query: ME_QUERY })
    .then(() => true)
    .catch(() => false);

  client.cache.writeData({
    data: {
      connected: isConnected
    }
  });
};
