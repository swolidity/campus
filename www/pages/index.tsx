import Layout from "../components/Layout";
import withApollo from "../lib/withApollo";
import CourseList from "../components/CourseList";
import checkLoggedIn from "../lib/checkLoggedIn";
import { Heading } from "@chakra-ui/core";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

const Index = () => {
  const user = useLoggedInUser();

  return (
    <Layout>
      <Heading mb={8}>👋 Hi Andy Kay!</Heading>
      <Heading mb={4} size="md">
        My Courses
      </Heading>

      <CourseList />
    </Layout>
  );
};
export default withApollo(Index);
