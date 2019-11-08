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
  Stack
} from "@chakra-ui/core";
import AddUnitModal from "../components/AddUnitModal";
import { unionWith } from "eslint-visitor-keys";

export const GET_COURSE_WITH_UNITS = gql`
  query GetCourseWithUnits($where: CourseWhereUniqueInput!) {
    course(where: $where) {
      id
      slug
      name
      title
      class_number
      units {
        id
        name
      }
    }
  }
`;

const CourseContent = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COURSE_WITH_UNITS, {
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
            <StatLabel>Content</StatLabel>
            <StatNumber>{data.course.content}</StatNumber>
          </Stat>
        </Box>
        <Box>
          <AddUnitModal
            courseID={data.course.id}
            courseSlug={data.course.slug}
          />
        </Box>
      </Flex>

      <Stack spacing={3}>
        {data.course.units.map(unit => (
          <Box p={4} shadow="sm">
            {unit.name}
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default CourseContent;
