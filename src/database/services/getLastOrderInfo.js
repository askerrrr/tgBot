const { mongodb } = require("../db");

async function getLastOrderInfo(userId) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    const existingDocument = await collection.findOne({ userId });

    if (!existingDocument) {
      return null;
    }

    const orderContent = await existingDocument.orders[
      existingDocument.orders.length - 1
    ].orderContent;

    console.log(orderContent);
    return orderContent;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getLastOrderInfo };
