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
  Button
} from "@chakra-ui/core";

const GET_COURSE_WITH_CONTENT = gql`
  query GetCourseWithContent($where: CourseWhereUniqueInput!) {
    course(where: $where) {
      id
      slug
      name
      title
      class_number
      content {
        id
      }
    }
  }
`;

const CourseContent = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COURSE_WITH_CONTENT, {
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
          <Button leftIcon="add">Add</Button>
        </Box>
      </Flex>
    </div>
  );
};

export default CourseContent;
