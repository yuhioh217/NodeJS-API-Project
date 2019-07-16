import resource from "resource-router-middleware";
import tools from "../model/tools";

export default ({ config, db }) =>
  resource({
    id: "tools",

    load(res, id, callback) {
      let tool = tools.find(tool => tool.id === id),
        err = tool ? null : "Not found";
      callback(err, tool);
    },

    index({ params }, res) {
      res.json(params);
    },

    create({ body }, res) {
      body.id = tools.length.toString(36);
      tools.push(body);
      res.json(body);
    },

    read({ tool }, res) {
      res.json(tool);
    },

    update({ tool, body }, res) {
      for (let key in body) {
        if (key !== "id") {
          tool[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    delete({ tool }, res) {
      tools.splice(tool.indexOf(tool), 1);
      res.sendStatus(204);
    }
  });
