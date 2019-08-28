import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseHeader from "./CourseHeader";

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

      <h3>{data.findOneCourse.users.length} users</h3>

      <ul>
        {data.findOneCourse.users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
