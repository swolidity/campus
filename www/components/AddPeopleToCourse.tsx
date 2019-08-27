import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Downshift from "downshift";

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
  const [getUsers, { loading, data }] = useLazyQuery(GET_USERS_NOT_IN_COURSE);

  const onSearch = value => {
    setSearchValue(value);

    getUsers({
      variables: {
        name: value
      }
    });
  };

  console.log(data);

  return (
    <div className="add-people">
      <h2>Add People</h2>

      <Downshift
        onChange={selection => console.log(selection)}
        onInputValueChange={onSearch}
        inputValue={searchValue}
      >
        {({ getInputProps, getItemProps, getLabelProps }) => (
          <div>
            <label {...getLabelProps()}>Search for people to add</label>
            <input {...getInputProps()} />

            <ul className="search-results">
              {data && data.usersNotInCourse
                ? data.usersNotInCourse.map((person, index) => (
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

      <style jsx>
        {`
          .add-people {
            margin-bottom: 28px;
          }
          .search-results {
            list-style: none;
          }
          .search-results li {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
