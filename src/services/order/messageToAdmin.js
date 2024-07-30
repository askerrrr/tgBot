async function orderMessageToAdmit(
  ctx,
  url,
  image,
  quantityAndSize,
  userPhoneNumber
) {
  const messageToAdmin = `ID пользователя : ${ctx.from.id}\nСсылка на товар : ${url}\nКоличество и размер : ${quantityAndSize}\nНомер телефона : ${userPhoneNumber.msg.text}\n`;
  await ctx.api.sendMessage("5364121551", messageToAdmin);
  await ctx.api.sendPhoto("5364121551", `${image}`);
}

module.exports = { orderMessageToAdmit }; //экспорт в src\services\order\singleOrder.js
