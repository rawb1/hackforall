import { apolloClient } from '@/plugins/apollo';
import { ME_QUERY } from '@/graphql/user';

const isAuthenticated = async () => {
  try {
    await apolloClient.query({
      query: ME_QUERY
    });
    return true;
  } catch (err) {
    return false;
  }
};

export { isAuthenticated };
