import Layout from "../../../components/Layout";
import CoursePeople from "../../../components/CoursePeople";
import withApollo from "../../../lib/withApollo";

const CoursePeoplePage = () => {
  return (
    <Layout>
      <CoursePeople />
    </Layout>
  );
};

export default withApollo(CoursePeoplePage);
