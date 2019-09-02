import Layout from "../components/Layout";
import withApollo from "../lib/withApollo";
import CourseList from "../components/CourseList";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const Index = ({ loggedInUser }) => {
  return (
    <Layout>
      <img height="100" width="100" src={loggedInUser.picture} />
      <h1 className="page-title">My Courses</h1>

      <CourseList />

      <style jsx>
        {`
          img {
            border-radius: 50%;
          }
          .page-title {
            margin-bottom: 28px;
          }
        `}
      </style>
    </Layout>
  );
};

Index.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.id) {
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default withApollo(Index);
