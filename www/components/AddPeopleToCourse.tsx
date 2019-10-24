import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Downshift from "downshift";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Input,
  Button
} from "@chakra-ui/core";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Button leftIcon="add" onClick={onOpen}>
        Add
      </Button>

      <div>{mutationError ? mutationError.message : null}</div>
      <div>
        {mutationData && mutationData.addUserToCourse
          ? mutationData.addUserToCourse.name + " added to course. "
          : null}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                  <Input
                    {...getInputProps()}
                    placeholder="Add to course"
                    mb={4}
                  />
                  <Button
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
                  </Button>

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
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <style jsx>
        {`
          .search-results {
            margin-top: 7px;
            list-style: none;
          }
          .search-results li {
            margin-top: 7px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
