const { mongodb, collection } = require("../db");

async function updateOrderStatus(userId, fileId, newStatus) {
  try {
    await mongodb.connect();

    const updateStatus = await collection.updateOne(
      { userId: `${userId}`, "orders.order.file.id": fileId },
      {
        $set: { "orders.$.order.file.status": newStatus },
      }
    );

    if (!updateStatus) {
      console.log("Ошибка при обновлении статуса...");
    }

    return updateStatus;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { updateOrderStatus };
