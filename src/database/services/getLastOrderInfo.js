const { mongodb, collection } = require("../db");

async function getLastOrderInfo(userId) {
  try {
    await mongodb.connect();

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
