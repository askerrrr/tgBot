var { mongodb, collection } = require("../db");

module.exports.updateOrderStatus = async (order) => {
  try {
    await mongodb.connect();

    var updatedStatus = await collection.updateOne(
      { userId: order.userId, "orders.order.id": order.id },
      {
        $set: { "orders.$.order.orderStatus": order.orderStatus },
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
    // await mongodb.close();
  }
};
