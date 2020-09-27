import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const cache = new InMemoryCache();

const httpLink = createUploadLink({
  uri: '/graphql'
});

// fix mutations
// Strip __typename from variables
// from https://github.com/apollographql/apollo-client/issues/1913#issuecomment-425281027
const middleWareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === '__typename' ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
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
