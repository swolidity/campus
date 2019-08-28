import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import AddPeopleToCourse from "./AddPeopleToCourse";
import CourseHeader from "./CourseHeader";

const GET_COURSE_WITH_PEOPLE = gql`
  query GetCourseWithPeople($where: CourseWhereUniqueInput!) {
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

export default function CoursePeople() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COURSE_WITH_PEOPLE, {
    variables: {
      where: {
        id: router.query.id
      }
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div>
      <CourseHeader course={data.findOneCourse} />
      <AddPeopleToCourse courseID={router.query.id} />

      {data.findOneCourse.users.map(person => {
        return <div>{person.name}</div>;
      })}
    </div>
  );
}
