const { env } = require("../../../../../env");
const { getDateAndTime } = require("../../../different/dateAndTime");

async function sendOrderMessageToAdmin(order) {
  const messageToAdmin = `ID пользователя : ${
    order.chatId
  }\nВремя заказа ${getDateAndTime().fullTime()}\nСсылка на товар : ${
    order.url
  }\nКоличество и размер : ${order.quantityAndSize}\nНомер телефона : ${
    order.userPhoneNumber.msg.text
  }\n`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendPhoto(env.admin_id, `${order.image}`);

  // await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  // await ctx.api.sendPhoto(env.admin2_id, `${orderInfo.image}`);
}

module.exports = { sendOrderMessageToAdmin }; //экспорт в src\services\order\singleOrder.js
