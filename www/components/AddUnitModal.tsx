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
  FormLabel,
  Switch,
  Flex
} from "@chakra-ui/core";
import { useFormik } from "formik";
import slug from "slug";

import { GET_COURSE_WITH_UNITS } from "../components/CourseContent";

const ADD_ASSIGNMENT = gql`
  mutation AddUnit($data: UnitCreateInput!) {
    createOneUnit(data: $data) {
      id
      name
      description
      order
      visible
      createdAt
      updatedAt
    }
  }
`;

export default function AddUnitModal({ courseID, courseSlug }) {
  const [addUnit, { data: mutationData, error: mutationError }] = useMutation(
    ADD_ASSIGNMENT,
    {
      update(cache, { data: { createOneUnit } }) {
        const { course } = cache.readQuery({
          query: GET_COURSE_WITH_UNITS,
          variables: {
            where: {
              slug: courseSlug
            }
          }
        });

        cache.writeQuery({
          query: GET_COURSE_WITH_UNITS,
          variables: {
            where: {
              slug: courseSlug
            }
          },
          data: {
            course: {
              ...course,
              units: [...course.units, createOneUnit]
            }
          }
        });
      }
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    onSubmit: values => {
      addUnit({
        variables: {
          data: {
            course: { connect: { id: courseID } },
            name: values.name,
            description: values.description,
            slug: slug(values.name),
            order: 0
          }
        }
      });

      toast({
        title: "Unit added to course.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
    }
  });

  return (
    <div>
      <Button leftIcon="add" onClick={onOpen}>
        Add Unit
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
          <ModalHeader>Add Unit</ModalHeader>
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

              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                mb={2}
              />

              <Flex align="center">
                <FormLabel htmlFor="email-alerts">
                  Visible to students?
                </FormLabel>
                <Switch id="visible">test</Switch>
              </Flex>
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
