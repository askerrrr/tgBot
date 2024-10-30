const { mongodb } = require("../db");

async function findActiveOrder(userId) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");

    const orders = await collection.findOne({ userId: `${userId}` });

    console.log("orders", orders);

    const activeOrders = orders.orders
      .map((orders) => orders.order)
      .filter(
        (order) =>
          order.file.status !== undefined &&
          order.file.status !== "order-is-completed"
      );
    console.log("active", activeOrders);
    return activeOrders.map((item) => {
      return `ID заказа ${item.file.id}\nВремя заказа ${item.date}\nПосмотреть содержимое заказа "ссылка"\nСтатус заказа : ${item.file.status}`;
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findActiveOrder };
