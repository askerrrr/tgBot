const { keyboardForOrder } = require("../../keyboard/keyboard");

async function goToTheOrder(bot) {
  bot.hears("Сделать заказ!", async (ctx) => {
    await ctx.reply("Выберите один из вариантов", {
      reply_markup: keyboardForOrder,
    });
  });
}

module.exports = { goToTheOrder };
