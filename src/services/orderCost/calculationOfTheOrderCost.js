const { gettingTheValueInRubles } = require("./service/gettingTheValueInRubles");

async function calculationOfTheOrderCost(conversation, ctx) {
  await ctx.reply("Пришлите стоимость товара, указанную на в магазине");
  const valueInYuan = await conversation.wait();
  await ctx.reply(`${gettingTheValueInRubles(valueInYuan.msg.text)}`);
}

module.exports = { calculationOfTheOrderCost };
