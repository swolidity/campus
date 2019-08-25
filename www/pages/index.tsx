import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import UploadCourseRoster from "../components/UploadCourseRoster";
import Layout from "../components/Layout";
import Link from "next/link";
import withApollo from "../lib/withApollo";

const GET_COURSES = gql`
  query getCourses {
    findManyCourse {
      id
      name
      title
      class_number
      createdAt
      updatedAt
    }
  }
`;

const Index = () => {
  const { loading, data, error } = useQuery(GET_COURSES);

  if (error) return <div>Error...</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="page-title">My Courses</h1>

      {data.findManyCourse.map(course => (
        <div key={course.id} className="course">
          <Link href="/courses/[id]" as={`/courses/${course.id}`}>
            <a className="course-name">
              {course.name} {course.class_number}
            </a>
          </Link>
        </div>
      ))}

      <style jsx>
        {`
          .page-title {
            margin-bottom: 28px;
          }
          .course {
            margin-bottom: 28px;
            background: #fff;
            border-radius: 5px;
            cursor: pointer;
          }
          .course:hover {
            border: 1px solid blue;
          }
          .course-name {
            padding: 20px;
            display: block;
            color: #000;
            font-weight: bold;
            text-decoration: none;
          }
        `}
      </style>
    </Layout>
  );
};

export default withApollo(Index);
