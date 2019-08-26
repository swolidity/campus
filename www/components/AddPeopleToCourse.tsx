import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Downshift from "downshift";
import UploadCourseRoster from "./UploadCourseRoster";

const GET_USERS_NOT_IN_COURSE = gql`
  query UsersNotInCourse($name: String!) {
    usersNotInCourse(name: $name) {
      id
      name
      email
    }
  }
`;

export default function AddPeopleToCourse() {
  const [searchValue, setSearchValue] = useState("");
  const [people, setPeople] = useState([]);
  const [getUsers, { loading, data }] = useLazyQuery(GET_USERS_NOT_IN_COURSE);

  const onSearch = value => {
    setSearchValue(value);

    getUsers({
      variables: {
        name: value
      }
    });
  };

  return (
    <div>
      <h2>Add People</h2>

      <UploadCourseRoster />

      <Downshift
        onChange={selection => console.log(selection)}
        onInputValueChange={onSearch}
        inputValue={searchValue}
      >
        {({ getInputProps, getItemProps, getLabelProps, isOpen }) => (
          <div>
            <label {...getLabelProps()}>Search for people to add</label>
            <input {...getInputProps()} />

            <ul>
              {isOpen
                ? people.map((person, index) => (
                    <li
                      {...getItemProps({
                        key: person.id,
                        index,
                        item: person
                      })}
                    >
                      {person.name}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
}
