const { mongodb } = require("../db");

async function updateOrderStatus(userId, fileId, requestedStatus) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    return await collection.updateOne(
      { userId, fileId },
      {
        $set: { "orders.$.order.file.status": requestedStatus },
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { updateOrderStatus };
