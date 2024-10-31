const { mongodb } = require("../db");
const {
  updateCurrentOrderStatus,
} = require("../../listeners/personalAccount/updateCurrentOrderStatus");
const {
  showActiveOrder,
} = require("../../listeners/personalAccount/showActiveOrder");

async function findActiveOrder(userId, ctx) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    const orders = await collection.findOne({ userId: `${userId}` });

    const activeOrders = orders?.orders
      .map((orders) => orders.order)
      .filter((order) => order.file.status !== "order-is-completed:6");

    console.log("activeOrders", activeOrders);

    const updatedActiveOrders = await updateCurrentOrderStatus(
      activeOrders,
      ctx
    );

    if (!updatedActiveOrders) console.log("update error");

    console.log("updatedActiveOrders", updatedActiveOrders);

    return activeOrders.map((order) => showActiveOrder(order));
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findActiveOrder };
