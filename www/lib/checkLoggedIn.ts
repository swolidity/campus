import gql from "graphql-tag";
import { ApolloClient, InMemoryCache } from "apollo-boost";

export default (apolloClient: ApolloClient<InMemoryCache>) =>
  apolloClient
    .query({
      query: gql`
        query LoggedInUser {
          loggedInUser {
            id
            name
            picture
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data.loggedInUser };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
