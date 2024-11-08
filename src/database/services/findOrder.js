const { mongodb } = require("../db");

async function findOrder(userId) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    const orders = await collection.findOne({ userId: `${userId}` });
    return {
      active: async () => {
        return orders.orders.filter(
          (data) => data.order.file.status !== "order-is-completed:6"
        );
      },
      completed: async () => {
        return orders.orders.filter(
          (data) => data.order.file.status == "order-is-completed:6"
        );
      },
    };
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findOrder };
