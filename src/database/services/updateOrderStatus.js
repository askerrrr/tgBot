const { mongodb, collection } = require("../db");

async function updateOrderStatus(userId, fileId, newStatus) {
  try {
    await mongodb.connect();

    const updatedStatus = await collection.updateOne(
      { userId: `${userId}`, "orders.order.file.id": fileId },
      {
        $set: { "orders.$.order.file.status": newStatus },
      }
    );

    if (!updatedStatus) {
      console.log("Ошибка при обновлении статуса...");
      return;
    }

    return updatedStatus;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await mongodb.close();
  }
}

module.exports = { updateOrderStatus };
