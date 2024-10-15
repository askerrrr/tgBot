const crypto = require("crypto");
const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { getDateAndTime } = require("../different/dateAndTime");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function makingAnOrder(conversation, ctx) {
  try {
    const chatId = ctx.chat.id;
    const userName = ctx.chat.user_name === undefined ? "" : ctx.chat.user_name;
    const firstName =
      ctx.chat.first_name === undefined ? "" : ctx.chat.first_name;

    const orderTime = getDateAndTime().fullTime();
    const randomKey = crypto.randomBytes(10).toString("hex");

    let fileUrl;
    let phone;

    do {
      fileUrl = await getFile(ctx, conversation);
    } while (!fileUrl);

    do {
      phone = await getPhone(ctx, conversation);
    } while (!phone);

    const order = {
      phone,
      userId: chatId,
      date: orderTime,
      file: {
        url: fileUrl,
        id: randomKey,
        pathToFile: `/var/www/userFiles/${chatId}/${randomKey}.xlsx`,
      },
      firstName,
      userName,
    };

    console.log(order);
    await returnOrderDataToUser(ctx, order);
    await checkOrderStatus(ctx, conversation, order, makingAnOrder);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { makingAnOrder }; //экспорт в src\middleware\middleware.js
