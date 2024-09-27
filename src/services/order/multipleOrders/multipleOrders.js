const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function multipleOrders(conversation, ctx) {
  const chatId = ctx.chat.id;

  const fileURL = await getFile(ctx, conversation);
  const phone = await getPhone(ctx, conversation);

  const order = { chatId, fileURL, phone };

  await returnOrderDataToUser(ctx, order);
  await checkOrderStatus(ctx, conversation, order, multipleOrders);
}

module.exports = { multipleOrders }; //экспорт в src\middleware\middleware.js
