import gql from "graphql-tag";

export default (apolloClient, code) =>
  apolloClient
    .query({
      query: gql`
        query login {
          user {
            id
            name
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
