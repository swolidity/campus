import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_COURSE_MESSAGES = gql`
  query GetCourseMessages($course_id: ID) {
    getCourseMessages(course_id: $course_id) {
      id
      message
      createdAt
      user {
        id
        name
      }
    }
  }
`;

export default function CourseMessageList({ courseID }) {
  const { loading, error, data } = useQuery(GET_COURSE_MESSAGES, {
    variables: {
      where: {
        course: {
          id: courseID
        }
      }
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {data.getCourseMessages.map(courseMessage => (
        <div key={courseMessage.id}>{courseMessage.message}</div>
      ))}
    </div>
  );
}
