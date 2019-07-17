import config from "../config.json";

export const getAllData = async (client, callback) => {
  //let err = !db ? "DB not fount" : null;
  if (!client) {
    callback("DB not found", null);
  }
  let db = client.db(config.database.DB);
  try {
    const res = await db
      .collection(config.database.collection)
      .find({})
      .toArray();
    callback(null, res);
  } catch (e) {
    callback(e, null);
  }
};
