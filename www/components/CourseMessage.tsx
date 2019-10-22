import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Box, Button, Textarea } from "@chakra-ui/core";
import { GET_COURSE_MESSAGES } from "./CourseMessageList";

const CREATE_COURSE_MESSAGE = gql`
  mutation CreateCourseMessage($course_id: ID!, $message: String!) {
    createCourseMessage(course_id: $course_id, message: $message) {
      id
      message
      createdAt
      user {
        id
        name
        picture
      }
    }
  }
`;

export default function CourseMessage({ courseID, ...props }) {
  const [message, setMessage] = useState("");
  const [createMessage, { loading, error, data }] = useMutation(
    CREATE_COURSE_MESSAGE,
    {
      update(cache, { data: { createCourseMessage } }) {
        const { getCourseMessages } = cache.readQuery({
          query: GET_COURSE_MESSAGES,
          variables: {
            where: {
              course: {
                id: courseID
              }
            }
          }
        });

        cache.writeQuery({
          query: GET_COURSE_MESSAGES,
          variables: {
            where: {
              course: {
                id: courseID
              }
            }
          },
          data: {
            getCourseMessages: getCourseMessages.concat([createCourseMessage])
          }
        });
      }
    }
  );

  const onSubmit = e => {
    e.preventDefault();

    createMessage({
      variables: {
        course_id: courseID,
        message
      }
    });
  };

  const onChange = e => {
    setMessage(e.target.value);
  };

  return (
    <Box {...props}>
      <form onSubmit={onSubmit}>
        <Textarea
          shadow="sm"
          placeholder="Send your class a message"
          onChange={onChange}
          value={message}
          mb={4}
        />

        <Button type="submit">Send</Button>
      </form>
    </Box>
  );
}
