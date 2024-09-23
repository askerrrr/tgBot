const { env } = require("../../../../../env");
const {
  getDateAndTime,
} = require("../../../../services/different/dateAndTime");

async function sendOrderFileToAdmin(ctx, order) {
  const messageToAdmin = `Новый заказ\n\n\nID : ${
    order.chatId
  }\nНомер телефона : ${
    order.phone
  }\nВремя заказа ${getDateAndTime().fullTime()}`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  //await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  await ctx.api.sendDocument(env.admin_id, order.fileId);
}

module.exports = { sendOrderFileToAdmin };
