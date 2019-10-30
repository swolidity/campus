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
  Button,
  useToast
} from "@chakra-ui/core";

import { GET_COURSE_WITH_GRADEBOOK } from "../components/CourseGradebook";

const ADD_ASSIGNMENT = gql`
  mutation AddAssignment($data: AssignmentCreateInput!) {
    createOneAssignment(data: $data) {
      id
      name
      points
      createdAt
      updatedAt
    }
  }
`;

export default function AddAssignmentModal({ courseID, courseSlug }) {
  const [
    addAssignment,
    { data: mutationData, error: mutationError }
  ] = useMutation(ADD_ASSIGNMENT, {
    update(cache, { data: { createOneAssignment } }) {
      const { course } = cache.readQuery({
        query: GET_COURSE_WITH_GRADEBOOK,
        variables: {
          where: {
            slug: courseSlug
          }
        }
      });

      console.log("course", course);

      console.log("createOneAssignment", createOneAssignment);

      cache.writeQuery({
        query: GET_COURSE_WITH_GRADEBOOK,
        variables: {
          where: {
            slug: courseSlug
          }
        },
        data: {
          course: {
            ...course,
            assignments: [...course.assignments, createOneAssignment]
          }
        }
      });
    }
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <div>
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
          <ModalHeader>Add Assignment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              onClick={() => {
                addAssignment({
                  variables: {
                    data: {
                      course: { connect: { id: courseID } },
                      name: "Quiz 3",
                      points: 100
                    }
                  }
                });

                toast({
                  title: "Assignment added to course.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
                });
              }}
            >
              Add Assignment
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
