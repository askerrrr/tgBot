const {
  gettingTheValueInRubles,
} = require("./service/gettingTheValueInRubles");

async function calcOrderCost(conversation, ctx) {
  await ctx.reply("Отправьте число");
  let num = await conversation.wait();
  num = num.msg.text;
  await ctx.reply(`${gettingTheValueInRubles(num)}`);
}

module.exports = { calcOrderCost };
