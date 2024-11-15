const { mongodb, collection } = require("../db");

async function getLastOrderInfo(userId) {
  try {
    await mongodb.connect();

    const existingDocument = await collection.findOne({ userId: `${userId}` });

    if (!existingDocument) return null;

    const lastOrder =
      existingDocument.orders[existingDocument.orders.length - 1].order;

    return lastOrder;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await mongodb.close();
  }
}

module.exports = { getLastOrderInfo };
