import Layout from "../../components/Layout";
import withApollo from "../../lib/withApollo";
import Course from "../../components/Course";

const CoursePage = () => {
  return (
    <Layout>
      <Course />
    </Layout>
  );
};

export default withApollo(CoursePage);
