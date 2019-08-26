import Layout from "../components/Layout";
import withApollo from "../lib/withApollo";
import CourseList from "../components/CourseList";

const Index = () => {
  return (
    <Layout>
      <h1 className="page-title">My Courses</h1>

      <CourseList />

      <style jsx>
        {`
          .page-title {
            margin-bottom: 28px;
          }
        `}
      </style>
    </Layout>
  );
};

export default withApollo(Index);
