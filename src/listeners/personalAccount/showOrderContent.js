const { statusTranslate } = require("../../services/different/statusTranslate");

function showOrderContent(order) {
  return `ID заказа : ${order.file.id}\nНомер телефона : ${
    order.phone
  }\nВремя заказа ${
    order.date
  }\nПосмотреть содержимое заказа "ссылка"\nСтатус заказа : ${statusTranslate(
    order.file.status
  )}`;
}

module.exports = { showOrderContent };
