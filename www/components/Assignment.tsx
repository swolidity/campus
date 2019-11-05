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
import GradeRow from "../components/GradeRow";

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

  const handlePointsChange = useCallback(
    number => user => {
      console.log("handlePointsChange");
      setGrades(grades => ({
        ...grades,
        [user.id]: {
          ...grades[user.id],
          points: number
        }
      }));
    },
    []
  );

  if (loading) return <div>Loading...</div>;

  useEffect(() => {
    console.log("useEffect");
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
          <GradeRow
            user={user}
            points={grades[user.id].points}
            onPointsChange={handlePointsChange}
            key={user.id}
          />
        ))}
      </Stack>
    </Box>
  );
}
