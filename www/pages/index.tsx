import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import UploadCourseRoster from "../components/UploadCourseRoster";

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
    <div>
      <img height="35" src="/static/better@2x.png" alt="Better" />

      <UploadCourseRoster />

      {data.findManyCourse.map(course => (
        <div key={course.id}>
          <a href="#">{course.name}</a>
        </div>
      ))}
    </div>
  );
};
