import CourseHeader from "./CourseHeader";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const GET_COURSE_WITH_GRADEBOOK = gql`
  query GetCourseWithGradebook($where: CourseWhereUniqueInput!) {
    findOneCourse(where: $where) {
      id
      name
      title
      class_number
    }
  }
`;

const CourseGradebook = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COURSE_WITH_GRADEBOOK, {
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
    </div>
  );
};

export default CourseGradebook;
