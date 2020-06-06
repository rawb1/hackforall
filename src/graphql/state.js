import gql from 'graphql-tag';

export const typeDefs = gql`
  type Mutation {
    connect: Boolean
    disconnect: Boolean
  }
`;

export const resolvers = {
  Mutation: {
    connect: (_, args, { cache }) => {
      cache.writeData({
        data: { connected: true }
      });
    },
    disconnect: (_, args, { cache }) => {
      cache.writeData({
        data: { connected: false }
      });
    }
  }
};
