import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
  query getUsers {
    findManyUser {
      id
      name
      email
      createdAt
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(GET_USERS);

  console.log(data);
  return <div>This is Better!</div>;
};
