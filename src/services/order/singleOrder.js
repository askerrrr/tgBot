const { textForOneOrder } = require("../../utils/text");

async function singleOrder(conversation, ctx) {
  await ctx.reply(textForOneOrder);
  const { message } = await conversation.wait();
  await ctx.reply("Спасибо, скоро начнем обрабатывать ваш заказ");
}

module.exports = { singleOrder };
