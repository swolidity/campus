import Meta from "./Meta";
import Link from "next/link";
import AppNavUserMenu from "./AppNavUserMenu";
import {
  ThemeProvider,
  ColorModeProvider,
  theme,
  useColorMode,
  Button,
  Flex,
  Box
} from "@chakra-ui/core";

const customTheme = {
  ...theme,
  icons: {
    ...theme.icons
  }
};

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Meta />

      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <Flex
            px={8}
            py={3}
            borderBottom="2px"
            borderColor="#fafafa"
            justify="space-between"
            align="center"
          >
            <Box className="flex-item">
              <Link href="/">
                <a className="logo">
                  <img height="45px" src="/static/campus@2x.png" alt="Campus" />
                </a>
              </Link>
            </Box>

            <Box>
              <Flex align="center">
                <Button onClick={toggleColorMode} mr={4}>
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
                <AppNavUserMenu />
              </Flex>
            </Box>
          </Flex>

          <div className="wrapper">
            <main className="main">{children}</main>
          </div>
        </ColorModeProvider>
      </ThemeProvider>

      <style jsx>
        {`
          .logo {
            text-decoration: none;
            color: black;
            font-size: 25px;
            font-weight: bold;
          }
          logo:visited: {
            color: black;
          }
          .wrapper {
            padding-top: 28px;
            height: 100vh;
            width: 100%;
          }
          .main {
            max-width: 800px;
            margin: 0 auto;
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
