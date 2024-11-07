const { env } = require("../../../env");
const { showOrderContent } = require("./showOrderContent");
const { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");
const { findActiveOrder } = require("../../database/services/findActiveOrder");

async function getActiveOrders(bot) {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      const userId = ctx.chat.id;

      const activeOrders = await findActiveOrder(userId);

      if (!activeOrders || activeOrders.length < 1) {
        await ctx.reply("Активных заказов не найдено");
        return;
      }

      const statusUpdatePromises = activeOrders.map((order) =>
        updateCurrentOrderStatus(order, ctx).catch((err) => console.log(err))
      );

      const result = await Promise.all(statusUpdatePromises);

      if (result) {
        const updatedActiveOrders = await findActiveOrder(userId);
        if (!updatedActiveOrders) {
          await ctx.reply("Что-то пошло не так, повторите позже...");
        }

        await ctx.reply("Активные заказы");

        return updatedActiveOrders.map(async (orders) => {
          await ctx.reply(showOrderContent(orders.order, userId));
        });
      }
    });
  } catch (err) {
    console.log(err);
    await ctx.api.sendMessage(env.admin_id, err.message);
  }
}

module.exports = { getActiveOrders };
