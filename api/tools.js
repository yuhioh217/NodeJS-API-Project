import resource from "./resource-router-middleware";
import tools from "../model/tools";

export default ({ config, db }) =>
  resource({
    mergeParams: true,
    id: "tools",

    load(res, id, callback) {
      let tool = tools.find(tool => tool.id.toString() === id),
        err = tool ? null : "Not found";
      //console.log(tool);
      callback(err, tool);
    },

    list({ params }, res) {
      res.json({ params });
    },

    create({ body }, res) {
      body.id = tools.length.toString(36);
      tools.push(body);
      res.json(body);
    },

    read({ params }, res) {
      res.json(params);
    },

    // PUT /toos/:id, and json format body
    update({ tools, body }, res) {
      console.log(tools);
      console.log("update data");
      for (let key in body) {
        console.log(key);
        if (key !== "id") {
          tools[key] = body[key];
        }
      }
      console.log(tools);
      res.sendStatus(204);
    },

    delete({ tool }, res) {
      tools.splice(tool.indexOf(tool), 1);
      res.sendStatus(204);
    }
  });
