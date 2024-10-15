const { env } = require("../../../../env");

async function sendOrderFileToAdmin(ctx, order) {
  const fileURL = `<u><a href="https://test-nodejs.ru/download/var/www/userFiles/${order.userId}/${order.file.id}>Файл</a>"</u>`;

  const messageToAdmin = `Новый заказ\n\nID пользователя: ${
    order.userId
  }\nНомер телефона : ${order.phone}\nСсылка на таблицу : ${
    order.file.url
  }\nСсылка на файл : ${""}\nВремя заказа : ${order.date}\nID заказа : ${
    order.file.id
  }`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);

  //await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
}

module.exports = { sendOrderFileToAdmin };
