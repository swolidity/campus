import Layout from "../components/Layout";
import Login from "../components/Login";
import googleLogin from "../lib/googleLogin";
import withApollo from "../lib/withApollo";

const LoginPage = () => {
  console.log("login render");
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

LoginPage.getInitialProps = async ({ apolloClient, query }) => {
  const code = query.code;
  console.log("query", query);
  const { loggedInUser } = await googleLogin(apolloClient, code);
};

export default withApollo(LoginPage);
