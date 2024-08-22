const { env } = require("../../../../../env");
const {
  getDateAndTime,
} = require("../../../../services/different/dateAndTime");

async function sendOrderFileToAdmin(ctx, fileId, userPhoneNumber) {
  const messageToAdmin = `Заказ от пользователя ${
    ctx.from.id
  }\nНомер телефона ${
    userPhoneNumber.msg.text
  }\nВремя заказа ${getDateAndTime().fullTime()}`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendDocument(env.admin_id, fileId);
}

module.exports = { sendOrderFileToAdmin };
