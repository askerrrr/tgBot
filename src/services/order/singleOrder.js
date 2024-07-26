const { textForOneOrder } = require("../../utils/text");

async function singleOrder(conversation, ctx) {
  await ctx.reply("Пришлите ссылку на товар");
  const { url } = await conversation.wait();
  await ctx.reply(`${typeof url}`);
}

module.exports = { singleOrder };
