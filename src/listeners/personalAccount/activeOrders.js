const { findActiveOrder } = require("../../database/services/findActiveOrder");

async function getActiveOrders(bot) {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      const userId = ctx.chat.id;
      const activeOrders = await findActiveOrder(userId, ctx);

      console.log(activeOrders);

      if (!activeOrders) await ctx.reply("Активных заказов не найдено");
      else activeOrders.forEach((item) => ctx.reply(item));
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getActiveOrders };
