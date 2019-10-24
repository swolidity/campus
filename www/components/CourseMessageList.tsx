import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Stack, Box, Heading, Text, Image, Flex, Link } from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

export const GET_COURSE_MESSAGES = gql`
  query GetCourseMessages($course_id: ID) {
    getCourseMessages(course_id: $course_id) {
      id
      message
      createdAt
      user {
        id
        name
        picture
      }
    }
  }
`;

export default function CourseMessageList({ courseID }) {
  const { loading, error, data } = useQuery(GET_COURSE_MESSAGES, {
    variables: {
      where: {
        course: {
          id: courseID
        }
      }
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(data);
  return (
    <Stack spacing={4}>
      {data.getCourseMessages.map(courseMessage => (
        <Box p={3} shadow="sm" key={courseMessage.id}>
          <Flex align="center" mb={2}>
            <NextLink href="/users/[id]" as={`/users/${courseMessage.user.id}`}>
              <Link>
                <Image
                  rounded="full"
                  size="40px"
                  src={courseMessage.user.picture}
                  alt={courseMessage.user.name}
                  mr={4}
                />
              </Link>
            </NextLink>

            <div>
              <Heading as="h6" size="xs">
                <NextLink
                  href="/users/[id]"
                  as={`/users/${courseMessage.user.id}`}
                >
                  <Link>{courseMessage.user.name}</Link>
                </NextLink>
              </Heading>
              <Text>
                {formatDistanceToNow(new Date(courseMessage.createdAt))} ago
              </Text>
            </div>
          </Flex>

          <Text>{courseMessage.message}</Text>
        </Box>
      ))}
    </Stack>
  );
}
