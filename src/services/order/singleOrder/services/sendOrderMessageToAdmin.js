const { env } = require("../../../../../env");
const { getDateAndTime } = require("../../../different/dateAndTime");

async function sendOrderMessageToAdmin(ctx, orderInfo) {
  const messageToAdmin = `ID пользователя : ${
    ctx.from.id
  }\nВремя заказа ${getDateAndTime().fullTime()}\nСсылка на товар : ${
    orderInfo.url
  }\nКоличество и размер : ${orderInfo.quantityAndSize}\nНомер телефона : ${
    orderInfo.userPhoneNumber.msg.text
  }\n`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendPhoto(env.admin_id, `${orderInfo.image}`);

  // await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  // await ctx.api.sendPhoto(env.admin2_id, `${orderInfo.image}`);
}

module.exports = { sendOrderMessageToAdmin }; //экспорт в src\services\order\singleOrder.js
