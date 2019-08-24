import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

const CREATE_COURSE = gql`
  mutation CreateCourse($data: CourseCreateInput!) {
    createOneCourse(data: $data) {
      id
      name
    }
  }
`;

export default () => {
  const [createCourse, { data, loading, error }] = useMutation(CREATE_COURSE);

  return (
    <Layout>
      <h1 className="page-title">Create A New Course</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          createCourse({
            variables: {
              data: {
                name: "Seinfeld 101",
                title: "yada yada yada",
                term: 2010,
                subject: "SEINFELD",
                catalog_number: 1234,
                component: "LEC",
                class_number: 1234
              }
            }
          });
        }}
      >
        <div>
          <label>Name</label>
          <input name="name" type="text" />
        </div>

        <div>
          <label>Title</label>
          <input name="title" type="text" />
        </div>

        <div>
          <label>Description</label>
          <textarea name="description" />
        </div>

        <button type="submit">Create Course</button>
      </form>

      <style jsx>
        {`
          .page-title {
            margin-bottom: 28px;
          }
          input {
            width: 100%;
            padding: 8px;
            border-radius: 5px;
            border: none;
            margin-bottom: 28px;
          }
          textarea {
            width: 100%;
          }
        `}
      </style>
    </Layout>
  );
};
