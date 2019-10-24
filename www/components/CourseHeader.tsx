import CourseNav from "./CourseNav";
import { Heading, Text } from "@chakra-ui/core";

const CourseHeader = ({ course }) => {
  return (
    <div>
      <Heading>{course.name}</Heading>
      <Text mb={4}>{course.title}</Text>
      <CourseNav slug={course.slug} />
    </div>
  );
};

export default CourseHeader;
