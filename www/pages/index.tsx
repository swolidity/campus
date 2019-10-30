import Layout from "../components/Layout";
import withApollo from "../lib/withApollo";
import CourseList from "../components/CourseList";
import checkLoggedIn from "../lib/checkLoggedIn";
import { Heading } from "@chakra-ui/core";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

const Index = () => {
  const { data } = useLoggedInUser();

  return (
    <Layout>
      {data.user ? <Heading mb={8}>👋 Hi {data.user.name}!</Heading> : null}

      <Heading mb={4} size="md">
        My Courses
      </Heading>

      <CourseList />
    </Layout>
  );
};
export default withApollo(Index);
