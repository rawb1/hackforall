import { apolloClient } from '@/plugins/apollo';
import {
  CONNECTED_QUERY,
  ME_QUERY,
  DISCONNECT_MUTATION,
  CONNECT_MUTATION
} from '@/graphql/user';

const isAuthenticated = async () => {
  const res = await apolloClient.query({
    query: CONNECTED_QUERY
  });
  if (!res.data || res.data.connected) {
    try {
      await apolloClient.query({
        query: ME_QUERY
      });
      apolloClient.mutate({ mutation: CONNECT_MUTATION });
    } catch (err) {
      apolloClient.mutate({ mutation: DISCONNECT_MUTATION });
      return false;
    }
  }
  return true;
};

export { isAuthenticated };
