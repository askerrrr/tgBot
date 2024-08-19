const { env } = require("../../../../env");
const { getDateAndTime } = require("../../different/dateAndTime");

async function orderMessageToAdmin(
  ctx,
  url,
  image,
  quantityAndSize,
  userPhoneNumber
) {
  const messageToAdmin = `ID пользователя : ${
    ctx.from.id
  }\nВремя заказа ${getDateAndTime().fullTime()}\nСсылка на товар : ${url}\nКоличество и размер : ${quantityAndSize}\nНомер телефона : ${
    userPhoneNumber.msg.text
  }\n`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendPhoto(env.admin_id, `${image}`);
}

module.exports = { orderMessageToAdmin }; //экспорт в src\services\order\singleOrder.js
