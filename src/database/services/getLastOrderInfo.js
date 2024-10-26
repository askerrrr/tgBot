const { mongodb } = require("../db");

async function getLastOrderInfo(userId) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    const existingDocument = await collection.findOne({ userId: `${userId}` });

    if (!existingDocument) {
      return null;
    }

    const order =
      existingDocument.orders[existingDocument.orders.length - 1].order;

    return order;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getLastOrderInfo };
