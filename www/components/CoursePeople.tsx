import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_COURSE_PEOPLE = gql`
  query GET_COURSE_PEOPLE($course_id: String!) {
    getCoursePeople(course_id: $course_id) {
      id
      name
      email
    }
  }
`;

export default function CoursePeople() {
  const router = useRouter();
  const { loading, data } = useQuery(GET_COURSE_PEOPLE, {
    variables: {
      course_id: router.query.id
    }
  });

  if (loading) return <div>Loading...</div>;

  if (data.getCoursePeople.length === 0)
    return (
      <div>
        This course is kind of lonely 😞. Hey, I know! Why not add some cool new
        people to it below?
      </div>
    );

  return (
    <div>
      {data.getCoursePeople.map(person => {
        return <div>{person.name}</div>;
      })}
    </div>
  );
}
