import Layout from "../../../components/Layout";
import PageTitle from "../../../components/PageTitle";
import { useMutation } from "@apollo/react-hooks";
import CreateUser from "../../../components/CreateUser";
import withApollo from "../../../lib/withApollo";

const NewUserPage = () => (
  <Layout>
    <PageTitle>Create New User</PageTitle>

    <CreateUser />
  </Layout>
);

export default withApollo(NewUserPage);
