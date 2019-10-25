import Layout from "../../../components/Layout";
import { useMutation } from "@apollo/react-hooks";
import withApollo from "../../../lib/withApollo";
import { Heading } from "@chakra-ui/core";
import UploadCourseRoster from "../../../components/UploadCourseRoster";

const NewUserPage = () => (
  <Layout>
    <Heading mb={4}>Upload Course Roster</Heading>

    <UploadCourseRoster />
  </Layout>
);

export default withApollo(NewUserPage);
