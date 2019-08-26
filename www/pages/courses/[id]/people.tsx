import Layout from "../../../components/Layout";
import CoursePeople from "../../../components/CoursePeople";
import withApollo from "../../../lib/withApollo";
import PageTitle from "../../../components/PageTitle";

const CoursePeoplePage = () => {
  return (
    <Layout>
      <PageTitle>People</PageTitle>

      <CoursePeople />
    </Layout>
  );
};

export default withApollo(CoursePeoplePage);
