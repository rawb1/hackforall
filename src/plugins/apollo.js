import Vue from 'vue';
import VueApollo from 'vue-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { typeDefs, resolvers } from '@/graphql/state';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: '/graphql'
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            Vue.$log.debug('UNAUTHENTICATED');
            cache.writeData({
              data: { connected: false }
            });
        }
      }
    }
    if (networkError) {
      Vue.$log.error(`[Network error]: ${networkError}`);
    }
  }
);

const link = errorLink.concat(httpLink);

const apolloClient = new ApolloClient({
  typeDefs,
  resolvers,
  link,
  cache
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export { apolloClient, apolloProvider };
