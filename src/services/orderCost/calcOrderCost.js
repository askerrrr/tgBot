const {
  gettingTheValueInRubles,
} = require("./service/gettingTheValueInRubles");

async function calcOrderCost(conversation, ctx) {
  await ctx.reply("Отправьте число");
  let response = await conversation.wait();
  num = response.msg.text;
  let val = await gettingTheValueInRubles(num);
  await ctx.reply(
    `Ориентировочная стоимость товара ${val} рублей без учета доставки`
  );
}

module.exports = { calcOrderCost };
