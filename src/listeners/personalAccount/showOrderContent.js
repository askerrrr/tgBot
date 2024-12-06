var { statusTranslate } = require("../../services/different/statusTranslate");

module.exports.showOrderContent = (order, userId) => {
  return `ID пользователя : ${userId}\nID заказа : ${
    order.id
  }\nНомер телефона : ${order.phone}\nВремя заказа ${
    order.date
  }\nСтатус заказа : ${statusTranslate(
    order.orderStatus
  )}\n\nПосмотреть содержимое заказа можно по ссылке`;
};
