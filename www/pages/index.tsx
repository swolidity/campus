import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

  return (
    <div>
      <img height="35" src="/static/better@2x.png" alt="Better" />

      {data.findManyCourse.map(course => (
        <div key-={course.id}>
          <a href="#">{course.name}</a>
        </div>
      ))}
    </div>
  );
};
