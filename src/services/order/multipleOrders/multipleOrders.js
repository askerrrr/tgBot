const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { checkOrderStatus } = require("./services/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function multipleOrders(conversation, ctx) {
  const chatId = ctx.chat.id;

  const fileId = await getFile(ctx, conversation);
  const phone = await getPhone(ctx, conversation);

  const order = { chatId, fileId, phone };

  await returnOrderDataToUser(ctx, order);
  await checkOrderStatus(ctx, conversation, order, multipleOrders);
}

module.exports = { multipleOrders }; //экспорт в src\middleware\middleware.js
