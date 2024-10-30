const { mongodb } = require("../db");
const { statusTranslate } = require("../../services/different/statusTranslate");

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
    return activeOrders.map((order) => {
      return `ID заказа ${order.file.id}\nНомер телефона : ${
        order.phone
      }\nВремя заказа ${
        order.date
      }\nПосмотреть содержимое заказа "ссылка"\nСтатус заказа : ${statusTranslate(
        order.file.status.split(":")[1]
      )}`;
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findActiveOrder };
