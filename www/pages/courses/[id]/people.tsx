import Layout from "../../../components/Layout";
import CoursePeople from "../../../components/CoursePeople";
import withApollo from "../../../lib/withApollo";
import PageTitle from "../../../components/PageTitle";
import CourseNav from "../../../components/CourseNav";
import { useRouter } from "next/router";

const CoursePeoplePage = () => {
  const router = useRouter();

  return (
    <Layout>
      <CoursePeople />
    </Layout>
  );
};

export default withApollo(CoursePeoplePage);
