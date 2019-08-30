import GoogleIconSvg from "../components/GoogleIconSvg";
import GoogleLogin from "react-google-login";

export default function Login() {
  return (
    <div>
      <GoogleLogin
        clientId="360446931329-u0k050oj6uh947u81juo2hhi7g15120o.apps.googleusercontent.com"
        onSuccess={res => console.log("success", res)}
        onFailure={() => console.log("failure")}
        cookiePolicy={"single_host_origin"}
        uxMode="redirect"
        redirectUri={process.env.GOOGLE_REDIRECT_URI}
        render={renderProps => (
          <div>
            <a onClick={renderProps.onClick}>
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
        )}
      />
    </div>
  );
}
