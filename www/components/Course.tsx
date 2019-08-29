import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseHeader from "./CourseHeader";
import CourseMessage from "./CourseMessage";
import CourseMessageList from "./CourseMessageList";

const GET_COURSE = gql`
  query GET_COURSE($where: CourseWhereUniqueInput!) {
    findOneCourse(where: $where) {
      id
      name
      title
      class_number
      users {
        id
        name
        email
      }
    }
  }
`;

export default function Course() {
  const router = useRouter();
  const { loading, data } = useQuery(GET_COURSE, {
    variables: {
      where: {
        id: router.query.id
      }
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CourseHeader course={data.findOneCourse} />

      <CourseMessage courseID={router.query.id} />
      <CourseMessageList courseID={router.query.id} />
    </div>
  );
}
