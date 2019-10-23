import Layout from "../components/Layout";
import withApollo from "../lib/withApollo";
import CourseList from "../components/CourseList";
import checkLoggedIn from "../lib/checkLoggedIn";
import { Heading } from "@chakra-ui/core";

const Index = () => {
  return (
    <Layout>
      <Heading>👋 Hi! Welcome to Campus.</Heading>
      <Heading mb={4}>My Courses</Heading>

      <CourseList />
    </Layout>
  );
};
export default withApollo(Index);
