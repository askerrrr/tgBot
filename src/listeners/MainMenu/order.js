const { keyboardForOrder } = require("../../keyboard/keyboard");
const { findOrder } = require("../../database/services/findOrder");

module.exports.order = async (bot) => {
  bot.hears("Сделать заказ!", async (ctx) => {
    var userId = ctx.chat.id;

    const activeOrders = await findOrder(userId).then((order) =>
      order.active()
    );

    if (activeOrders && activeOrders.length > 5) {
      await ctx.reply("Вы превысили количество активных заказов");

      return;
    }

    await ctx.reply("Выберите один из вариантов", {
      reply_markup: keyboardForOrder,
    });
  });
};
