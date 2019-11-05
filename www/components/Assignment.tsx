import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseHeader from "./CourseHeader";
import {
  Flex,
  Box,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Avatar,
  Stack,
  Select,
  Checkbox,
  Input,
  Button
} from "@chakra-ui/core";
import { useState, useEffect, useCallback } from "react";

const GET_ASSIGNMENT = gql`
  query GET_ASSIGNMENT($where: AssignmentWhereUniqueInput!) {
    assignment(where: $where) {
      id
      slug
      name
      points
      createdAt
      updatedAt
      grades {
        id
        points
      }
      course {
        users {
          id
          name
          picture
        }
      }
    }
  }
`;

export default function Assignment() {
  const router = useRouter();
  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: {
      where: {
        slug: router.query.assignment_slug
      }
    }
  });

  const [grades, setGrades] = useState({});

  if (loading) return <div>Loading...</div>;

  useEffect(() => {
    if (data.assignment.course.users) {
      const users = data.assignment.course.users;

      const newGrades = setGrades(
        Object.assign(
          {},
          ...users.map(user => ({
            [user["id"]]: {
              id: user.id,
              letter_grade: null,
              points: 0,
              percent: 0
            }
          }))
        )
      );
    }
  }, [data.assignment.course.users]);

  if (Object.keys(grades).length < 1) return null;

  const setAllPointsTo = () => {
    let updatedGrades = {};

    for (const grade in grades) {
      updatedGrades[grade] = { ...grades[grade], points: 10 };
    }

    setGrades(updatedGrades);
  };

  console.log(grades);

  return (
    <Box>
      <Heading mb={4}>{data.assignment.name}</Heading>

      <Button color="green" mb={4} onClick={setAllPointsTo}>
        Set All Points To 10
      </Button>

      <Stack spacing={2}>
        {data.assignment.course.users.map(user => (
          <Box shadow="sm" p={2} key={user.id}>
            <Flex align="center" mb={2}>
              <Avatar src={user.picture} name={user.name} mr={2} size="sm" />
              <Text>{user.name}</Text>
            </Flex>

            <Flex align="center">
              <Select
                aria-labelledby="Letter Grade"
                placeholder="Letter Grade"
              ></Select>

              <NumberInput
                defaultValue={0}
                precision={2}
                step={1}
                mr={2}
                value={grades[user.id].points}
                id="points"
                onChange={number => {
                  setGrades({
                    ...grades,
                    [user.id]: {
                      ...grades[user.id],
                      points: number
                    }
                  });
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Text>Points</Text>

              <Input placeholder="%" />
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
