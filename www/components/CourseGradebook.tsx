import CourseHeader from "./CourseHeader";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Stack,
  Link
} from "@chakra-ui/core";
import AddAssignmentModal from "./AddAssignmentModal";
import NextLink from "next/link";

export const GET_COURSE_WITH_GRADEBOOK = gql`
  query GetCourseWithGradebook($where: CourseWhereUniqueInput!) {
    course(where: $where) {
      id
      slug
      name
      title
      class_number
      assignments {
        id
        slug
        name
        points
        createdAt
        updatedAt
      }
    }
  }
`;

const CourseGradebook = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COURSE_WITH_GRADEBOOK, {
    variables: {
      where: {
        slug: router.query.id
      }
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CourseHeader course={data.course} />

      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Stat>
            <StatLabel>Assignments</StatLabel>
            <StatNumber>{data.course.assignments.length}</StatNumber>
          </Stat>
        </Box>
        <Box>
          <AddAssignmentModal
            courseID={data.course.id}
            courseSlug={router.query.id}
          />
        </Box>
      </Flex>

      <Stack spacing={3}>
        {data.course.assignments.map(assignment => (
          <Box shadow="sm" p={3} key={assignment.id}>
            <NextLink
              href="/courses/[id]/gradebook/[slug]"
              as={`/courses/${data.course.slug}/gradebook/${assignment.slug}`}
            >
              <Link>
                {assignment.name} ({assignment.points} pts)
              </Link>
            </NextLink>
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default CourseGradebook;
