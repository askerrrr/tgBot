const { env } = require("../../../../../env");
const {
  getDateAndTime,
} = require("../../../../services/different/dateAndTime");

async function sendOrderFileToAdmin(ctx, order) {
  const messageToAdmin = `Новый заказ\n\nID : ${
    order.chatId
  }\nНомер телефона : ${order.phone}\nСсылка на таблицу : ${
    order.fileURL
  }\nВремя заказа ${getDateAndTime().fullTime()}`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  //await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
}

module.exports = { sendOrderFileToAdmin };
