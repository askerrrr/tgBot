const { keyboardForOrder } = require("../../keyboard/keyboard");

module.exports.order = async (bot) => {
  bot.hears("Сделать заказ!", async (ctx) => {
    await ctx.reply("Выберите один из вариантов", {
      reply_markup: keyboardForOrder,
    });
  });
};
