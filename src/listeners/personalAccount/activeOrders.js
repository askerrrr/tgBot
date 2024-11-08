const { showOrderContent } = require("./showOrderContent");
const { findOrder } = require("../../database/services/findOrder");
const { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");

async function getActiveOrders(bot) {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      const userId = ctx.chat.id;

      const activeOrders = await findOrder(userId).then((order) =>
        order.active()
      );

      if (!activeOrders || activeOrders.length < 1) {
        await ctx.reply("Активных заказов не найдено");
        return;
      }

      const statusUpdatePromises = activeOrders.map((order) =>
        updateCurrentOrderStatus(order, ctx).catch((err) => {
          console.log(err);
          return;
        })
      );

      const result = await Promise.all(statusUpdatePromises);

      if (result.includes(null)) return;

      const updatedActiveOrders = await findOrder(userId).then((order) =>
        order.active()
      );

      if (!updatedActiveOrders) {
        await ctx.reply("Что-то пошло не так, повторите позже...");
        return;
      }

      await ctx.reply("Активные заказы");

      return updatedActiveOrders.map(async (orders) => {
        await ctx.reply(showOrderContent(orders.order, userId));
      });
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getActiveOrders };
