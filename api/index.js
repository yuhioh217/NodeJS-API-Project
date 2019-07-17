import { version } from "../package.json";
import { Router } from "express";
import user from "./user";

export default ({ config, db }) => {
  let api = Router();
  const app = { config, db };

  api.use("/user", user(app));

  api.get("/", (req, res) => {
    res.status(501).json({});
  });

  return api;
};
