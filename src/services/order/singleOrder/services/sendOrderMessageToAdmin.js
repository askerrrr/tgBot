const { env } = require("../../../../../env");
const { getDateAndTime } = require("../../../different/dateAndTime");

async function sendOrderMessageToAdmin(
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
 // await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  await ctx.api.sendPhoto(env.admin_id, `${image}`);
  //await ctx.api.sendPhoto(env.admin2_id`${image}`);
}

module.exports = { sendOrderMessageToAdmin }; //экспорт в src\services\order\singleOrder.js
