const { convertYuanToRubles } = require("./service/convertYuanToRubles");

async function calcOrderCost(conversation, ctx) {
  await ctx.reply("Отправьте число");
  let response = await conversation.wait();
  let num = response.msg.text;
  let result = await convertYuanToRubles(num);

  if (num > 0 && num < 1000000) {
    await ctx.reply(
      `Ориентировочная стоимость товара ${result} рублей \n*без учета стоимости доставки`
    );
  } else if (num > 1000000) {
    await ctx.reply(
      `Боюсь, что у вас нет таких денег)))\nВведите числовое значение, которое больше 0`
    );
    return await calcOrderCost(conversation, ctx);
  } else {
    await ctx.reply(`Введите числовое значение, которое больше 0`);
    return await calcOrderCost(conversation, ctx);
  }
}

module.exports = { calcOrderCost };
