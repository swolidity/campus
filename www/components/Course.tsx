import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseHeader from "./CourseHeader";
import CourseMessage from "./CourseMessage";
import CourseMessageList from "./CourseMessageList";

const GET_COURSE = gql`
  query GET_COURSE($id: String!) {
    findCourse(id: $id) {
      id
      slug
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
      id: router.query.id
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CourseHeader course={data.findCourse} />

      <CourseMessage courseID={data.findCourse.id} mb={8} />
      <CourseMessageList courseID={data.findCourse.id} />
    </div>
  );
}
