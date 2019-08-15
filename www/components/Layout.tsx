import Meta from "./Meta";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />

      <div className="header">
        <Link href="/">
          <a className="logo">
            <img height="35" src="/static/better@2x.png" alt="Better" />
          </a>
        </Link>
      </div>

      <main>{children}</main>

      <style jsx>
        {`
          .header {
            padding: 16px;
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
        `}
      </style>
    </div>
  );
};

export default Layout;
