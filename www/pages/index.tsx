import Layout from "../components/Layout";
import withApollo from "../lib/withApollo";
import CourseList from "../components/CourseList";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import { Heading } from "@chakra-ui/core";

const Index = ({ loggedInUser }) => {
  let hi = null;
  if (loggedInUser) {
    hi = <Heading mb={8}>👋 Hi {loggedInUser.name}!</Heading>;
  }

  return (
    <Layout>
      {hi}

      <Heading mb={4} size="md">
        My Courses
      </Heading>

      <CourseList />
    </Layout>
  );
};

Index.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser) {
    // If not signed in, send them somewhere more useful
    redirect(context, "/login");
  }

  return { loggedInUser };
};
export default withApollo(Index);
