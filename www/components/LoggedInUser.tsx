import { useLoggedInUser } from "../hooks/useLoggedInUser";

export default function LoggedInUser() {
  const { loading, error, data } = useLoggedInUser();

  if (loading || !data || !data.loggedInUser) return <div>Login</div>;

  const user = data.loggedInUser;

  return (
    <div>
      <img width="45" height="45" src={user.picture} alt={user.name} />

      <style jsx>
        {`
          img {
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
}
