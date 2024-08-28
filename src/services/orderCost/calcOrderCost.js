const {
  gettingTheValueInRubles,
} = require("./service/gettingTheValueInRubles");

async function calcOrderCost(conversation, ctx) {
  await ctx.reply("Отправьте число");
  let response = await conversation.wait();
  num = response.msg.text;
  let val = await gettingTheValueInRubles(num);

  if (num > 0) {
    await ctx.reply(
      `Ориентировочная стоимость товара ${val} рублей без учета доставки`
    );
  } else {
    await ctx.reply(`Введите число больше 0`);
    return await calcOrderCost(conversation, ctx);
  }
}

module.exports = { calcOrderCost };
