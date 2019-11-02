import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseHeader from "./CourseHeader";
import CourseMessage from "./CourseMessage";
import CourseMessageList from "./CourseMessageList";
import { Text } from "@chakra-ui/core";

const GET_ASSIGNMENT = gql`
  query GET_ASSIGNMENT($where: AssignmentWhereUniqueInput!) {
    assignment(where: $where) {
      id
      slug
      name
      points
      createdAt
      updatedAt
    }
  }
`;

export default function Course() {
  const router = useRouter();
  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: {
      where: {
        slug: router.query.assignment_slug
      }
    }
  });

  if (loading) return <div>Loading...</div>;

  return <div>{data.assignment.name}</div>;
}
