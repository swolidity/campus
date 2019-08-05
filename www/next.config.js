const prod = process.env.NODE_ENV === "production";

module.exports = {
  target: "serverless",
  env: {
    API_URL: prod ? "https://better.now.sh/api" : "http://localhost:4000"
  }
};
