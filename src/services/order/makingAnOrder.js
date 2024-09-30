const { conv } = require("./conversation/conversation");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function makingAnOrder(conversation, ctx) {
  const id = ctx.chat.id;

  const order = await conv(ctx, conversation);

  order.chatId = id;
  await returnOrderDataToUser(ctx, order);
  await checkOrderStatus(ctx, conversation, order, makingAnOrder);
}

module.exports = { makingAnOrder }; //экспорт в src\middleware\middleware.js
