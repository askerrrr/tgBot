const { env } = require("../../../../env");

async function sendOrderFileToAdmin(ctx, order) {
  const messageToAdmin = `Новый заказ\n\nID пользователя: ${order.tgId}\nНомер телефона : ${order.phone}\nСсылка на таблицу : ${order.file.url}\nВремя заказа : ${order.date}\nID заказа : ${order.file.id}`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  //await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
}

module.exports = { sendOrderFileToAdmin };
