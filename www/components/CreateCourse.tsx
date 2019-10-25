import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Input, Button, Textarea, Stack, Heading } from "@chakra-ui/core";

const CREATE_COURSE = gql`
  mutation CreateCourse($data: CourseCreateInput!) {
    createOneCourse(data: $data) {
      id
      name
    }
  }
`;

export default function CreateCourse() {
  const [createCourse, { data, loading, error }] = useMutation(CREATE_COURSE);

  return (
    <div>
      <Heading className="page-title">Create Course</Heading>

      <form
        onSubmit={e => {
          e.preventDefault();
          createCourse({
            variables: {
              data: {
                name: "BIO 100",
                title: "Basic Biology",
                term: 2010,
                subject: "SEINFELD",
                catalog_number: 100,
                component: "LEC",
                class_number: 87617
              }
            }
          });
        }}
      >
        <Stack spacing={4}>
          <Input placeholder="Name" name="name" type="text" />

          <Input placeholder="Title" name="title" type="text" />

          <Textarea
            name="description"
            placeholder="Write a short description of your course..."
          />

          <Button type="submit">Create Course</Button>
        </Stack>
      </form>
    </div>
  );
}
