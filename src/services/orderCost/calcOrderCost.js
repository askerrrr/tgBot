const {
  convertYuanToRubles,
} = require("./service/convertYuanToRubles");

async function calcOrderCost(conversation, ctx) {
  await ctx.reply("Отправьте число");
  let response = await conversation.wait();
  num = response.msg.text;
  let val = await convertYuanToRubles(num);

  if (num > 0) {
    await ctx.reply(
      `Ориентировочная стоимость товара ${val} рублей \n*без учета стоимости доставки`
    );
  } else {
    await ctx.reply(`Введите числовое значение, которое больше 0`);
    return await calcOrderCost(conversation, ctx);
  }
}

module.exports = { calcOrderCost };
