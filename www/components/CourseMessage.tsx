import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CREATE_COURSE_MESSAGE = gql`
  mutation CreateCourseMessage($course_id: ID!, $message: String!) {
    createCourseMessage(course_id: $course_id, message: $message) {
      id
      message
      createdAt
    }
  }
`;

export default function CourseMessage({ courseID }) {
  const [message, setMessage] = useState("");
  const [createMessage, { loading, error, data }] = useMutation(
    CREATE_COURSE_MESSAGE
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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <textarea onChange={onChange} value={message} />
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
