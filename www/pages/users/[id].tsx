import Layout from "../../components/Layout";
import withApollo from "../../lib/withApollo";
import UserProfile from "../../components/UserProfile";

const UserProfilePage = () => (
  <Layout>
    <UserProfile />
  </Layout>
);

export default withApollo(UserProfilePage);
