const { env } = require("../../../env");
const { getDateAndTime } = require("../different/dateAndTime");

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

async function sendOrderFileToAdmin(ctx, fileId, userPhoneNumber) {
  const messageToAdmin = `Заказ от пользователя ${ctx.from.id}\nНомер телефона ${userPhoneNumber.msg.text}\n`;
  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendDocument(env.admin_id, fileId);
}

module.exports = { orderMessageToAdmin, sendOrderFileToAdmin }; //экспорт в src\services\order\singleOrder.js
