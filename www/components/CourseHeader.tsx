import CourseNav from "./CourseNav";
import { Heading } from "@chakra-ui/core";

const CourseHeader = ({ course }) => {
  return (
    <div>
      <Heading mb={4}>{course.name}</Heading>
      <CourseNav courseID={course.id} />
    </div>
  );
};

export default CourseHeader;
