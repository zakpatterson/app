import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { config } from './config';

const authLink = setContext(async (_, { headers = {} }) => {
  headers.authorization = `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOGVmM2E4NS04M2U1LTQ3NWUtODkyOS0yZTFhMzMwMzYwMDgiLCJpYXQiOjE2NzQ3MjM2MDUsImV4cCI6MTY3NDcyNzIwNX0.oiaSjiGjgxeoBO5mRGy1MRPgFrSb66RtE3MxFAzKxNeIwzHur9BZd0JbWlPSsraASb0cqVr6DQKRi9JT3j7S9w`;

  return {
    headers,
  };
});

const httpLink = createHttpLink({
  uri: config.API_URL,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { ApolloProvider };
