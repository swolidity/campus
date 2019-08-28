import CourseNav from "./CourseNav";
import PageTitle from "./PageTitle";

const CourseHeader = ({ course }) => {
  return (
    <div>
      <PageTitle>{course.name}</PageTitle>
      <CourseNav courseID={course.id} />
    </div>
  );
};

export default CourseHeader;
