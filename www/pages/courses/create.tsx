import Layout from "../../components/Layout";
import CreateCourse from "../../components/CreateCourse";
import withApollo from "../../lib/withApollo";

const CreateCoursePage = () => {
  return (
    <Layout>
      <CreateCourse />
    </Layout>
  );
};

export default withApollo(CreateCoursePage);
