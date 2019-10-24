import Layout from "../../../components/Layout";
import { useMutation } from "@apollo/react-hooks";
import CreateUser from "../../../components/CreateUser";
import withApollo from "../../../lib/withApollo";
import { Heading } from "@chakra-ui/core";

const NewUserPage = () => (
  <Layout>
    <Heading mb={4}>Create New User</Heading>

    <CreateUser />
  </Layout>
);

export default withApollo(NewUserPage);
