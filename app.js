"use strict";
import express, { Router } from "express";
import http from "http";
import morgan from "morgan"; //HTTP request logger middleware for node.js (https://www.npmjs.com/package/morgan)
import cors from "cors"; // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
import bodyParser from "body-parser";
import config from "./config.json";
import initializeDB from "./db";
import api from "./api";

let app = express();
app.server = http.createServer(app);

const middleware = ({ config, db }) => {
  /* Todo: process the middleware event */
  let routers = Router();
  return routers;
};

app.use(morgan("dev")); // Log with dev Color;
app.use(
  cors({
    exposeHeaders: config.corsHeaders
  })
);

app.use(bodyParser.json({ limit: config.bodyLimit }));

initializeDB(db => {
  app.use(middleware({ config, db }));
  app.use("/api", api(config, db));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});
export default app;
