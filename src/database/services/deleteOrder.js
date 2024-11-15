const { mongodb, collection } = require("../db");

module.exports.deleteOrder = async (userId, orderId) => {
  try {
    await mongodb.connect();

    const result = await collection.updateOne(
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

    if (result.modifiedCount === 0) return null;

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    mongodb.close();
  }
};
