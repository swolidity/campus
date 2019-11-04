import Meta from "./Meta";
import Link from "next/link";
import AppNavUserMenu from "./AppNavUserMenu";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
  useColorMode,
  Button,
  Flex,
  Box,
  Image
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
        <CSSReset />
        <ColorModeProvider value="light">
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
                  <Image
                    height="45px"
                    src="/campus@2x.png"
                    alt="Campus"
                    ignoreFallback
                  />
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
