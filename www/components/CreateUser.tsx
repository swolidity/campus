import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Stack,
  InputGroup,
  Input,
  InputLeftAddon,
  Button
} from "@chakra-ui/core";

const CREATE_USER = gql`
  mutation CreateOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      id
      name
      email
      picture
    }
  }
`;

const CreateUser = () => {
  const [values, setValues] = useState<any>({});
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const onInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    createUser({
      variables: {
        data: {
          ...values
        }
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Input
          type="text"
          name="name"
          onChange={onInputChange}
          value={values.name}
          placeholder="name"
          size="lg"
        />

        <Input
          type="text"
          name="email"
          onChange={onInputChange}
          value={values.email}
          placeholder="email"
          size="lg"
        />
        <Input
          type="url"
          name="picture"
          onChange={onInputChange}
          value={values.picture}
          placeholder="picture url"
          size="lg"
        />

        <Button type="submit">Create user</Button>
      </Stack>
    </form>
  );
};

export default CreateUser;
