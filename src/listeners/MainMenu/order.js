const { keyboardForOrder } = require("../../keyboard/keyboard");

async function order(bot) {
  bot.hears("Сделать заказ!", async (ctx) => {
    await ctx.reply("Выберите один из вариантов", {
      reply_markup: keyboardForOrder,
    });
  });
}

module.exports = { order };
