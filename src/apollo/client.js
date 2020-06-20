import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { typeDefs, resolvers, initializeState } from '@/apollo/state';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: '/graphql'
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            Vue.$log.debug('UNAUTHENTICATED');
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
  link,
  cache,
  typeDefs,
  resolvers
});

initializeState(apolloClient);

export default apolloClient;
