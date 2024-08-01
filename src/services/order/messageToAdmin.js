const { env } = require("../../../env");

async function orderMessageToAdmit(
  ctx,
  url,
  image,
  quantityAndSize,
  userPhoneNumber
) {
  const messageToAdmin = `ID пользователя : ${ctx.from.id}\nСсылка на товар : ${url}\nКоличество и размер : ${quantityAndSize}\nНомер телефона : ${userPhoneNumber.msg.text}\n`;
  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendPhoto(env.admin_id, `${image}`);
}

module.exports = { orderMessageToAdmit }; //экспорт в src\services\order\singleOrder.js
