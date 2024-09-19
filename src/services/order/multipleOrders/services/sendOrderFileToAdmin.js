const { env } = require("../../../../../env");
const { checkLastName } = require("./checkLastName");
const {
  getDateAndTime,
} = require("../../../../services/different/dateAndTime");

async function sendOrderFileToAdmin(
  ctx,
  fileId,
  userPhoneNumber,
  firstName,
  lastName
) {
  const messageToAdmin = `Новый заказ\n\nИмя : ${firstName}\nФамилия : ${checkLastName(
    lastName
  )}\nID : ${
    ctx.from.id
  }\nНомер телефона : ${userPhoneNumber}\nВремя заказа ${getDateAndTime().fullTime()}`;

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  await ctx.api.sendDocument(env.admin_id, fileId);
}

module.exports = { sendOrderFileToAdmin };
