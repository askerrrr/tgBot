const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function makingAnOrder(conversation, ctx) {
  try {
    const chatId = ctx.chat.id;

    let fileURL;
    let phone;

    do {
      fileURL = await getFile(ctx, conversation);
    } while (!fileURL);

    do {
      phone = await getPhone(ctx, conversation);
    } while (!phone);

    const order = { fileURL, phone, chatId };

    await returnOrderDataToUser(ctx, order);
    await checkOrderStatus(ctx, conversation, order, makingAnOrder);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { makingAnOrder }; //экспорт в src\middleware\middleware.js
