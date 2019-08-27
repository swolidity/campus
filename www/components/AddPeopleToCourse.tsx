import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Downshift from "downshift";
import { GET_COURSE_PEOPLE } from "./CoursePeople";

const GET_USERS_NOT_IN_COURSE = gql`
  query UsersNotInCourse($name: String!) {
    usersNotInCourse(name: $name) {
      id
      name
      email
    }
  }
`;

const ADD_USER_TO_COURSE = gql`
  mutation AddUserToCourse($user_id: ID!, $course_id: ID!) {
    addUserToCourse(user_id: $user_id, course_id: $course_id) {
      id
      name
      email
    }
  }
`;

export default function AddPeopleToCourse({ courseID }) {
  const [searchValue, setSearchValue] = useState("");
  const [getUsers, { loading, data }] = useLazyQuery(GET_USERS_NOT_IN_COURSE);
  const [
    addUserToCourse,
    { data: mutationData, error: mutationError }
  ] = useMutation(ADD_USER_TO_COURSE, {
    update(cache, { data: { addUserToCourse } }) {
      const { getCoursePeople } = cache.readQuery({
        query: GET_COURSE_PEOPLE,
        variables: {
          course_id: courseID
        }
      });

      cache.writeQuery({
        query: GET_COURSE_PEOPLE,
        variables: {
          course_id: courseID
        },
        data: { getCoursePeople: getCoursePeople.concat([addUserToCourse]) }
      });
    }
  });

  const onSearch = value => {
    setSearchValue(value);

    getUsers({
      variables: {
        name: value
      }
    });
  };

  return (
    <div className="add-people">
      <h2>Add People</h2>

      <div>{mutationError ? mutationError.message : null}</div>

      <Downshift
        onChange={selection => {
          console.log(selection);
          addUserToCourse({
            variables: {
              user_id: selection.id,
              course_id: courseID
            }
          });
        }}
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
