import Meta from "./Meta";
import Link from "next/link";
import AppNavUserMenu from "./AppNavUserMenu";
import { ThemeProvider, ColorModeProvider, theme } from "@chakra-ui/core";

const customTheme = {
  ...theme,
  icons: {
    ...theme.icons
  }
};

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />

      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <div className="header">
            <div className="flex-item">
              <Link href="/">
                <a className="logo">
                  <img height="45px" src="/static/campus@2x.png" alt="Campus" />
                </a>
              </Link>
            </div>

            <div className="flex-item">
              <AppNavUserMenu />
            </div>
          </div>

          <div className="wrapper">
            <main className="main">{children}</main>
          </div>
        </ColorModeProvider>
      </ThemeProvider>

      <style jsx>
        {`
          .header {
            padding: 16px 28px;
            background: #fff;
            border-bottom: 2px solid #fafafa;
            display: flex;
            justify-content: space-between;
          }
          .flex-item {
            display: flex;
          }
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
