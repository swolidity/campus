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
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel
} from "@chakra-ui/core";
import { useFormik } from "formik";
import sllug from "slug";

import { GET_COURSE_WITH_GRADEBOOK } from "../components/CourseGradebook";

const ADD_ASSIGNMENT = gql`
  mutation AddAssignment($data: AssignmentCreateInput!) {
    createOneAssignment(data: $data) {
      id
      slug
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
  const formik = useFormik({
    initialValues: {
      name: "",
      points: 0
    },
    onSubmit: values => {
      addAssignment({
        variables: {
          data: {
            course: { connect: { id: courseID } },
            name: values.name,
            slug: sllug(values.name),
            points: values.points
          }
        }
      });

      toast({
        title: "Assignment added to course.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
    }
  });

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
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                mb={2}
              />

              <FormControl>
                <FormLabel htmlFor="points">Points</FormLabel>
                <NumberInput
                  onChange={number =>
                    formik.setFieldValue("points", parseInt(number))
                  }
                  value={formik.values.points}
                  id="points"
                >
                  <NumberInputField type="number" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={formik.handleSubmit}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
