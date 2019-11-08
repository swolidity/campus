import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import NextLink from "next/link";
import { Stack, Box, Heading, Link, Text } from "@chakra-ui/core";

const GET_COURSES = gql`
  query getCourses {
    coursesByPin {
      id
      name
      slug
      title
      class_number
      createdAt
      updatedAt
    }
  }
`;

export default function CourseList() {
  const { loading, data, error } = useQuery(GET_COURSES);

  if (error) return <div>{error.message}</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <Stack spacing={4}>
      {data.coursesByPin.map(course => (
        <Box p={5} shadow="sm" key={course.id} className="course">
          <NextLink href="/courses/[id]" as={`/courses/${course.slug}`}>
            <Link>
              <Heading size="sm">
                {course.name} {course.class_number}
              </Heading>
              <Text>{course.title}</Text>
            </Link>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
}
