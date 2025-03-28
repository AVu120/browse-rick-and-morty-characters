import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  //   gql,
} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});
