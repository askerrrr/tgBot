const { mongodb, collection } = require("../db");

module.exports.updateOrderStatus = async (userId, orderId, newStatus) => {
  try {
    await mongodb.connect();

    console.log("newStatus", newStatus);
    const updatedStatus = await collection.updateOne(
      { userId, "orders.order.id": orderId },
      {
        $set: { "orders.$.order.orderStatus": newStatus },
      }
    );

    if (!updatedStatus) {
      console.log("Ошибка при обновлении статуса...");
      return;
    }

    return updatedStatus;
  } catch (err) {
    console.log(err);

    return;
  } finally {
    await mongodb.close();
  }
};
