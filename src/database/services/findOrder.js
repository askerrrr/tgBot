const { mongodb, collection } = require("../db");

async function findOrder(userId) {
  try {
    await mongodb.connect();

    const orders = await collection.findOne({ userId });

    return {
      active: async () =>
        orders?.orders.filter(
          (data) => data.order.orderStatus !== "order-is-completed:6"
        ),
      completed: async () =>
        orders?.orders.filter(
          (data) => data.order.orderStatus == "order-is-completed:6"
        ),
    };
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await mongodb.close();
  }
}

module.exports = { findOrder };
