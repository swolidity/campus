import Layout from "../../../../components/Layout";
import withApollo from "../../../../lib/withApollo";
import Assignment from "../../../../components/Assignment";

const AssignmentPage = () => {
  return (
    <Layout>
      <Assignment />
    </Layout>
  );
};

export default withApollo(AssignmentPage);
