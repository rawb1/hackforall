import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import omitDeep from 'omit-deep-lodash';

const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: '/graphql'
});

// Strip __typename from variables in mutation but keep them in cache
const middleWareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = omitDeep(operation.variables, ['__typename']);
  }
  return forward(operation);
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

const link = from([middleWareLink, errorLink, httpLink]);

const apolloClient = new ApolloClient({
  link,
  cache
});

export default apolloClient;
