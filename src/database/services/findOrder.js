const { mongodb, collection } = require("../db");

async function findOrder(userId) {
  try {
    await mongodb.connect();

    const orders = await collection.findOne({ userId: `${userId}` });

    return {
      active: async () =>
        orders?.orders.filter(
          (data) => data.order.file.status !== "order-is-completed:6"
        ),
      completed: async () =>
        orders?.orders.filter(
          (data) => data.order.file.status == "order-is-completed:6"
        ),
    };
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findOrder };
