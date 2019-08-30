import Meta from "./Meta";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />

      <div className="header">
        <Link href="/">
          <a className="logo">
            <img height="45px" src="/static/campus@2x.png" alt="Campus" />
          </a>
        </Link>
      </div>

      <div className="wrapper">
        <main className="main">{children}</main>
      </div>

      <style jsx>
        {`
          .header {
            padding: 16px 28px;
            background: #fff;
            border-bottom: 2px solid #fafafa;
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
