import client from '@/apollo/client';
import { ME_QUERY } from '@/graphql/user';
import { CONNECTED_QUERY } from '@/apollo/state';

export const isConnected = () => {
  return client
    .query({ query: CONNECTED_QUERY })
    .then(({ data }) => {
      if (!data) {
        // localState not initiated
        return client
          .query({ query: ME_QUERY })
          .then(({ data }) => {
            return !!data.me;
          })
          .catch(() => {
            return false;
          });
      } else {
        return !!data.connected;
      }
    })
    .catch(() => {
      return false;
    });
};
