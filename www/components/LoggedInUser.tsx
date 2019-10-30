import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { Image } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";

export default function LoggedInUser() {
  const { loading, error, data } = useLoggedInUser();

  if (loading || !data || !data.loggedInUser) return <Button>Login</Button>;

  const user = data.loggedInUser;

  return (
    <Image size="45px" rounded="full" src={user.picture} alt={user.name} />
  );
}
