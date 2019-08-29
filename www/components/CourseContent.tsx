import CourseHeader from "./CourseHeader";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const GET_COURSE_WITH_CONTENT = gql`
  query GetCourseWithContent($where: CourseWhereUniqueInput!) {
    findOneCourse(where: $where) {
      id
      name
      title
      class_number
    }
  }
`;

const CourseContent = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COURSE_WITH_CONTENT, {
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

export default CourseContent;
