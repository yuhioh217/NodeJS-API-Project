import * as mongodb from "mongodb";
import config from "./config.json";

export default async callback => {
  const dbClient = mongodb.MongoClient;
  // console.log(config.database.url);
  const db = await dbClient.connect(config.database.url, {
    useNewUrlParser: true
  });
  // console.log(db);
  if (!db) callback();
  console.log("MongoDB is connecting...");
  callback(db);
};
