import { apolloClient } from '@/plugins/apollo';
import { ME_QUERY } from '@/graphql/user';

const isAuthenticated = () => {
  return apolloClient
    .query({
      query: ME_QUERY
    })
    .then(() => true)
    .catch(() => false);
};

export { isAuthenticated };
