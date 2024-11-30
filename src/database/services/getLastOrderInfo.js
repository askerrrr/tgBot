var { mongodb, collection } = require("../db");

module.exports.getLastOrderInfo = async (userId) => {
  try {
    await mongodb.connect();

    var existingDocument = await collection.findOne({ userId });

    if (!existingDocument) return null;

    var lastOrder =
      existingDocument.orders[existingDocument.orders.length - 1].order;

    return lastOrder;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await mongodb.close();
  }
};
