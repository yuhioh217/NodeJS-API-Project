import { version } from "../package.json";
import { Router } from "express";
import tools from "./tools";

export default ({ config, db }) => {
  let api = Router();
  const app = { config, db };

  api.use("/tools", tools(app));

  api.get("/", (req, res) => {
    res.status(501).json({});
  });

  return api;
};
