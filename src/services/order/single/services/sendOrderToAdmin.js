const { env } = require("../../../../../env");

async function sendOrderToAdmin(order, ctx, imageId) {
  const messageToAdmin = `Новый заказ\n\nID пользователя : ${order.userId}\nНомер телефона : ${order.phone}\nСсылка на товар : ${order.url}\nОписание : ${order.desctiption}\nID заказа : ${order.file.id}`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendPhoto(env.admin_id, `${imageId}`);

  // await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  // await ctx.api.sendPhoto(env.admin2_id, `${orderInfo.image}`);
}

module.exports = { sendOrderToAdmin }; //экспорт в src\services\order\singleOrder.js
