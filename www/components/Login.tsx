import GoogleIconSvg from "../components/GoogleIconSvg";

// TODO: need to implement this serverside

export default function Login() {
  return (
    <div>
      <div>
        <a onClick={() => (location.href = `${process.env.API_URL}/login`)}>
          <span className="google-icon">
            <GoogleIconSvg />
          </span>
          <span className="login-text">Login with Google</span>
        </a>

        <style jsx>
          {`
            a {
              display: inline-block;
              cursor: pointer;
              padding: 16px 22px;
              border: 2px solid #fafafa;
              border-radius: 8px;
            }
            .google-icon {
              vertical-align: middle;
              display: inline-block;
              width: 24px;
              height: 24px;
              margin-right: 16px;
            }
            .login-text {
              vertical-align: middle;
              display: inline-block;
              font-weight: bold;
            }
          `}
        </style>
      </div>
    </div>
  );
}
