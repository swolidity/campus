import withApollo from "next-with-apollo";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const API_URL = process.env.API_URL;

const link = createUploadLink({ uri: API_URL });

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link,
      cache: new InMemoryCache().restore(initialState || {})
    }),
  {
    getDataFromTree: "always"
  }
);
