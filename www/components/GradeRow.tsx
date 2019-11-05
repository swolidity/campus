import { memo } from "react";
import {
  Flex,
  Box,
  Select,
  Avatar,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input
} from "@chakra-ui/core";

const GradeRow = ({ user, points, onPointsChange }) => {
  console.log("GradeRow render");
  return (
    <Box shadow="sm" p={2}>
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
          value={points}
          id="points"
          onChange={number => onPointsChange(number, user)}
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
  );
};

export default memo(GradeRow);
