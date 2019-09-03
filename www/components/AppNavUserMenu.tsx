import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { useApolloClient } from "@apollo/react-hooks";
import cookie from "cookie";
import redirect from "../lib/redirect";

import LoggedInUser from "./LoggedInUser";

export default function AppNavUserMenu() {
  const apolloClient = useApolloClient();

  return (
    <Menu>
      <MenuButton>
        <LoggedInUser />
      </MenuButton>

      <MenuList>
        <MenuItem
          onSelect={() => {
            document.cookie = cookie.serialize("token", "", {
              maxAge: -1 // Expire the cookie immediately
            });

            // Force a reload of all the current queries now that the user is
            // logged in, so we don't accidentally leave any state around.
            apolloClient.cache.reset().then(() => {
              // Redirect to a more useful page when signed out
              redirect({}, "/login");
            });
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
