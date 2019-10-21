import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Downshift from "downshift";

export const GET_COURSE_PEOPLE = gql`
  query GET_COURSE_PEOPLE($course_id: String!) {
    getCoursePeople(course_id: $course_id) {
      id
      name
      email
    }
  }
`;

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
  const [selectedUserId, setSelectedUserId] = useState("");
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
      <div>
        {mutationData && mutationData.addUserToCourse
          ? mutationData.addUserToCourse.name + " added to course. "
          : null}
      </div>

      <Downshift
        onChange={selection => {
          setSelectedUserId(selection.id);
        }}
        onInputValueChange={onSearch}
        inputValue={searchValue}
        itemToString={user => (user && user.name ? user.name : "")}
      >
        {({ getInputProps, getItemProps, getLabelProps }) => (
          <div>
            <label {...getLabelProps()}>Search for people to add </label>
            <input {...getInputProps()} />
            <button
              className="add-button"
              onClick={() => {
                addUserToCourse({
                  variables: {
                    user_id: selectedUserId,
                    course_id: courseID
                  }
                });
              }}
            >
              add
            </button>

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
            margin-top: 7px;
            list-style: none;
          }
          .search-results li {
            margin-top: 7px;
            cursor: pointer;
          }
          .add-button {
            margin-left: 7px;
            width: 28px;
          }
        `}
      </style>
    </div>
  );
}
