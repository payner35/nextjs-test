//_delete me when ready.. and check withApollo.js


import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = process.env.APOLLO_CLIENT;

const httpLink = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "QQMXUITEL6NQG1JCSHZA";
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
         authorization: token ? `${token}` : "",
      }
    }
  });


// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    }),
    { getDataFromTree: 'ssr' }
);