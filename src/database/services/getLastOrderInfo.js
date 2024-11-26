const { mongodb, collection } = require("../db");

module.exports.getLastOrderInfo = async (userId) => {
  try {
    await mongodb.connect();

    const existingDocument = await collection.findOne({ userId });

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
};
