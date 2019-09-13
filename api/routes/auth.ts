const express = require("express");
const helmet = require("helmet");
const app = express();
import { google } from "googleapis";
import Photon from "@generated/photon";
import jwt from "jsonwebtoken";

let cachePhoton: Photon | null = null;

// add some security-related headers to the response
app.use(helmet());

app.get("*", async (req: any, res: any) => {
  const code = req.query.code;
  const state = req.query.state;

  const photon: Photon = cachePhoton ? cachePhoton : new Photon();

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  let data;

  try {
    const userinfo = await google
      .oauth2({
        auth: oauth2Client,
        version: "v2"
      })
      .userinfo.get();

    data = userinfo.data;
  } catch (e) {
    throw new Error(e.message);
  }

  const { email, name, picture }: any = data;

  const user = await photon.users.upsert({
    where: {
      email: email
    },
    update: {
      name,
      email,
      picture
    },
    create: {
      name,
      email,
      picture
    }
  });

  const token = jwt.sign<any>(user, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.redirect(state);
});

module.exports = app;
