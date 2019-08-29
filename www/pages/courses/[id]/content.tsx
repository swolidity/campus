import Layout from "../../../components/Layout";
import withApollo from "../../../lib/withApollo";
import CourseContent from "../../../components/CourseContent";

const CourseContentPage = () => {
  return (
    <Layout>
      <CourseContent />
    </Layout>
  );
};

export default withApollo(CourseContentPage);
