import Layout from "../../../components/Layout";
import withApollo from "../../../lib/withApollo";
import CourseGradebook from "../../../components/CourseGradebook";

const CourseGradebookPage = () => {
  return (
    <Layout>
      <CourseGradebook />
    </Layout>
  );
};

export default withApollo(CourseGradebookPage);
