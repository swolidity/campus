import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      id
      name
      email
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
      <div>
        <div>
          <label>Name</label>
        </div>
        <input
          type="text"
          name="name"
          onChange={onInputChange}
          value={values.name}
        />
      </div>

      <div>
        <div>
          <label>Email</label>
        </div>
        <input
          type="text"
          name="email"
          onChange={onInputChange}
          value={values.email}
        />
      </div>

      <button type="submit">Create user</button>
    </form>
  );
};

export default CreateUser;
