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

async function addNewOrder(ctx, orderContent) {
  await mongodb.connect();
  const db = mongodb.db("telegram_users");
  const collection = db.collection("users");

  const existingDocument = await collection.findOne({
    tgId: orderContent.tgId,
  });

  if (existingDocument) {
    await collection.updateOne(
      { tgId: orderContent.tgId },
      { $push: { orders: { orderContent } } }
    );
  } else {
    const newUser = {
      tgId: ctx.chat.id,
      firstName: ctx.chat.first_name,
      userName: ctx.chat.user_name === undefined ? "" : ctx.chat.user_name,
      orders: [],
    };

    const result = await collection.insertOne(newUser);
    if (result) {
      return await collection.updateOne(
        { tgId: orderContent.tgId },
        { $push: { orders: { orderContent } } }
      );
    }
  }
}

async function orderInfo(id) {
  await mongodb.connect();
  const db = mongodb.db("telegram_users");
  const collection = db.collection("users");

  const existingDocument = await collection.findOne({ tgId: id });
  if (existingDocument) {
    const orderContent = await existingDocument.orders[
      existingDocument.orders.length - 1
    ].orderContent;

    console.log(orderContent);
    return orderContent;
  }
}

module.exports = { addNewUser, addNewOrder, orderInfo };
