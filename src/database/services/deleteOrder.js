const { mongodb, collection } = require("../db");

module.exports.deleteOrder = async (userId, orderId) => {
  try {
    await mongodb.connect();

    return await collection.updateOne(
      {
        userId,
        "orders.order.file.id": orderId,
      },
      {
        $pull: {
          orders: { "order.file.id": orderId },
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
