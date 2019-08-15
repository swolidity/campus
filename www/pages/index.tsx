import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import UploadCourseRoster from "../components/UploadCourseRoster";
import Layout from "../components/Layout";

const GET_COURSES = gql`
  query getCourses {
    findManyCourse {
      id
      name
      title
      createdAt
      updatedAt
      students {
        id
        name
        email
      }
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(GET_COURSES);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <UploadCourseRoster />

      {data.findManyCourse.map(course => (
        <div key={course.id}>
          <a href="#">{course.name}</a>
        </div>
      ))}
    </Layout>
  );
};
