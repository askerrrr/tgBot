const { env } = require("./env");
const MongoClient = require("mongodb").MongoClient;

const mongodb = new MongoClient(env.mongo_url);

async function addNewUser(id, user) {
  await mongodb.connect();
  const db = mongodb.db("telegram_users");
  const collection = db.collection("users");
  const existingDocument = await collection.findOne({ tgId: id });

  if (!existingDocument) {
    await collection.insertOne(user);
  } else {
    return null;
  }
}

async function addNewOrder(order) {
  await mongodb.connect();
  const db = mongodb.db("telegram_users");
  const collection = db.collection("users");

  const existingDocument = await collection.findOne({ tgId: order.tgId });

  if (existingDocument) {
    await collection.updateOne(
      { tgId: order.tgId },
      { $push: { orders: { order } } }
    );
  }
}

module.exports = { addNewUser, addNewOrder };
