import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Flex, Box, Heading, Text, Avatar } from "@chakra-ui/core";

const GET_USER = gql`
  query GET_USER($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      email
      picture
    }
  }
`;

export default function Course() {
  const router = useRouter();
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      where: {
        id: router.query.id
      }
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Flex align="center">
      <Box>
        <Avatar
          size="2xl"
          src={data.user.picture}
          name={data.user.name}
          mr={8}
        />
      </Box>
      <Box>
        <Heading>{data.user.name}</Heading>
        <Text>{data.user.email}</Text>
      </Box>
    </Flex>
  );
}
