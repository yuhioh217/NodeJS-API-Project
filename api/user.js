import resource from "./resource-router-middleware";
import { getAllData } from "../model/mongoController.js";
import tools from "../model/tools";

export default ({ config, db }) =>
  resource({
    mergeParams: true,
    id: "user",

    // load the basic id parameter, and check the data id is exist in Mongodb or not.
    load(req, id, callback) {
      // console.log(db);
      getAllData(db, (err, dataArr) => {
        if (err) {
          callback(err, null);
        }
        let data = dataArr.find(data => data.id.toString() === id),
          errMesg = data ? null : "Not found the element";
        callback(errMesg, data);
      });
    },

    /**
     * List all users data.
     *
     * GET /
     */
    list({ params }, res) {
      getAllData(db, (err, data) => {
        res.json({ result: data });
      });
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
