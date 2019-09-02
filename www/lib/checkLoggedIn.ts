import gql from "graphql-tag";
import { ApolloClient, InMemoryCache } from "apollo-boost";

export default (
  apolloClient: ApolloClient<InMemoryCache>,
  oauthCode: string | null
) =>
  apolloClient
    .query({
      query: gql`
        query LoggedInUser($oauthCode: String) {
          loggedInUser(oauthCode: $oauthCode) {
            id
            name
          }
        }
      `,
      variables: {
        oauthCode
      }
    })
    .then(({ data }) => {
      return { loggedInUser: data.loggedInUser };
    })
    .catch(e => {
      console.log(e);
      // Fail gracefully
      return { loggedInUser: { error: e.message } };
    });
