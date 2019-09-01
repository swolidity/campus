const express = require("express");
const helmet = require("helmet");
const app = express();
const { google } = require("googleapis");

// add some security-related headers to the response
app.use(helmet());

app.get("*", async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "online",
    scope: scopes,
    state: req.get("Referrer")
  });

  res.redirect(url);
});

module.exports = app;
