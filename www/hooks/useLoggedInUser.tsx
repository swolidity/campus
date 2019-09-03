import { createContext, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const LoggedInUserQuery = gql`
  query LoggedInUser {
    loggedInUser {
      id
      name
      email
      picture
    }
  }
`;

export const LoggedInUserContext = createContext({});

export const LoggedInUserProvider = ({ user, children }) => (
  <LoggedInUserContext.Provider value={user}>
    {children}
  </LoggedInUserContext.Provider>
);

// export const useLoggedInUser = () => useContext(LoggedInUserContext);

export const useLoggedInUser = () => {
  return useQuery(LoggedInUserQuery);
};
