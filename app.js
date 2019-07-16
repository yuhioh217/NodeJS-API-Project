"use strict";
import express, { Router } from "express";
import http from "http";
import morgan from "morgan"; //HTTP request logger middleware for node.js (https://www.npmjs.com/package/morgan)
import cors from "cors"; // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
import bodyParser from "body-parser";
import session from "express-session";
import uuid from "uuid/v4";
import SessionStore from "./lib/SessionStore";
import config from "./config.json";
import initializeDB from "./db";
import api from "./api";

// Init Express
let app = express();
app.server = http.createServer(app);

const middleware = ({ config, db }) => {
  /* Todo: process the middleware event */
  let routers = Router();
  return routers;
};

switch (process.env.NODE_ENV) {
  case "production":
  case "qa":
  case "staging":
    app.use(morgan("combined"));
    break;
  case "test":
    break;
  default:
    app.use(morgan("dev")); // Log with dev Color;
}

app.use(
  cors({
    exposeHeaders: config.corsHeaders
  })
);

app.use(bodyParser.json({ limit: config.bodyLimit }));

app.use(
  session({
    genid: () => uuid(),
    // name use default
    secret:
      "Y92Z29IIDGM7A5Z6RCXAU959UTEXVHXICT91SBLU8OPDNWBT90FLD99EM48YV211C0E4UT1M90IXTG5M86B3ZGFCFYLH8TZ0Y0PSUD68L04FXERDSZ6XGDET158OVDKE",
    resave: false,
    cookie: {
      secure: false
    },
    saveUninitialized: false,
    store: new SessionStore(session)
  })
);

initializeDB(db => {
  app.use(middleware({ config, db }));
  app.use("/api", api(config, db));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});
export default app;
