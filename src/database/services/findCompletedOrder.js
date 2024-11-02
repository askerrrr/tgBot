const { mongodb } = require("../db");

async function findCompletedOrder(userId) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    const orders = await collection.findOne({ userId: `${userId}` });

    return orders.orders.filter(
      (data) => data.order.file.status == "order-is-completed:6"
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findCompletedOrder };
