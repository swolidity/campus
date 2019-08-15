import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import UploadCourseRoster from "../components/UploadCourseRoster";
import Layout from "../components/Layout";
import Link from "next/link";

const GET_COURSES = gql`
  query getCourses {
    findManyCourse {
      id
      name
      title
      createdAt
      updatedAt
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(GET_COURSES);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <UploadCourseRoster />

      <h2>Courses: {data.findManyCourse.length}</h2>

      {data.findManyCourse.map(course => (
        <div key={course.id}>
          <Link href="/courses/[id]" as={`/courses/${course.id}`}>
            <a>{course.name}</a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};
