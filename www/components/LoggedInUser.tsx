import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { Image } from "@chakra-ui/core";

export default function LoggedInUser() {
  const { loading, error, data } = useLoggedInUser();

  if (loading || !data || !data.loggedInUser) return <div>Login</div>;

  const user = data.loggedInUser;

  return (
    <Image size="45px" rounded="full" src={user.picture} alt={user.name} />
  );
}
