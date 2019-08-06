import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";

const API_URL = process.env.API_URL;

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: API_URL,
      cache: new InMemoryCache().restore(initialState || {})
    }),
  {
    getDataFromTree: "always"
  }
);
