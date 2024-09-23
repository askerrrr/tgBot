const { env } = require("../../../../../env");
const { checkLastName } = require("./checkLastName");
const {
  getDateAndTime,
} = require("../../../../services/different/dateAndTime");

async function sendOrderFileToAdmin(ctx, fileId, userPhoneNumber) {
  const messageToAdmin = `Новый заказ\n\n\nID : ${
    ctx.from.id
  }\nНомер телефона : ${userPhoneNumber}\nВремя заказа ${getDateAndTime().fullTime()}`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  //await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  await ctx.api.sendDocument(env.admin_id, fileId);
}

module.exports = { sendOrderFileToAdmin };
