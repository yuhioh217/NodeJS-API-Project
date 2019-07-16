import { version } from "../package.json";
import { Router } from "express";
import tools from "./tools";

export default ({ config, db }) => {
  let api = Router();
  api.use("/tools", tools({ config, db }));
  api.get("/", (res, req) => {
    res.json({ version });
  });

  return api;
};
