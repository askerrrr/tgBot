const crypto = require("crypto");
const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { getDateAndTime } = require("../different/dateAndTime");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function makingAnOrder(conversation, ctx) {
  try {
    const chatId = ctx.chat.id;
    const orderTime = getDateAndTime().fullTime();
    const randomKey = crypto.randomBytes(10).toString("hex");

    let fileURL;
    let phone;

    do {
      fileURL = await getFile(ctx, conversation);
    } while (!fileURL);

    do {
      phone = await getPhone(ctx, conversation);
    } while (!phone);

    const order = {
      phone,
      tgId: chatId,
      date: orderTime,
      file: { url: fileURL, id: randomKey },
      firstName: ctx.chat.first_name,
      userName: ctx.chat.user_name === undefined ? "" : ctx.chat.user_name,
    };

    await returnOrderDataToUser(ctx, order);
    await checkOrderStatus(ctx, conversation, order, makingAnOrder);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { makingAnOrder }; //экспорт в src\middleware\middleware.js
