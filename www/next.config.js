const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  target: "serverless",
  env: {
    API_URL: process.env.API_URL,
    API_LOGIN_URL: process.env.API_LOGIN_URL
  }
});
