import { LoggedInUserProvider } from "../hooks/useLoggedInUser";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

export default function withAuth(Component) {
  return <Component />;
}

withAuth.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser) {
    redirect(context, "/login");
  }

  return { loggedInUser };
};
