const { findActiveOrder } = require("../../database/services/findActiveOrder");
const { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");

async function getActiveOrders(bot) {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      const userId = ctx.chat.id;
      const activeOrders = await findActiveOrder(userId, ctx);

      console.log(activeOrders.map((item) => item));

      if (!activeOrders) await ctx.reply("Активных заказов не найдено");

      const updatedActiveOrders = activeOrders.map(async (orders) => {
        await updateCurrentOrderStatus(orders, ctx);
      });

      console.log(updatedActiveOrders);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getActiveOrders };
