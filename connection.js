const { env } = require("./env");
const MongoClient = require("mongodb").MongoClient;

const mongodb = new MongoClient(env.mongo_url);

async function addNewUser(user) {
  await mongodb.connect();
  const db = mongodb.db("telegram_users");
  const collection = db.collection("users");
  await collection.insertOne(user);
  return collection;
}

async function addNewOrder(order) {
  await mongodb.connect();
  const db = mongodb.db("telegram_users");
  const collection = db.collection("users");
  await collection.insertOne(
    { tgId: order.tgId },
    { orders: { $set: { orderContent: order } } }
  );
}

module.exports = { addNewUser, addNewOrder };
