const { mongodb } = require("../db");

async function updateOrderStatus(userId, fileId, requestedStatus) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    const updateStatus = await collection.updateOne(
      { userId, fileId },
      {
        $set: { "orders.$.order.file.status": requestedStatus },
      }
    );

    if (!updateStatus) {
      console.log("Статус не обновился");
    }

    console.log("Статус обновлен");
    return updateStatus;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { updateOrderStatus };
