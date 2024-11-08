const { showOrderContent } = require("./showOrderContent");
const { findOrder } = require("../../database/services/findOrder");
const { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");

async function getCompletedOrders(bot) {
  try {
    bot.hears("Завершенные заказы", async (ctx) => {
      const userId = ctx.chat.id;

      const completedOrders = await findOrder(userId).then((order) =>
        order.completed()
      );

      if (!completedOrders || completedOrders.length < 1) {
        await ctx.reply("Завершенных заказов не найдено");
        return;
      }
      const statusUpdatePromises = completedOrders.map((order) =>
        updateCurrentOrderStatus(order, ctx)
      );

      const result = await Promise.all(statusUpdatePromises);

      if (result.includes(null)) return;

      const updatedActiveOrders = await findOrder(userId).then((order) =>
        order.completed()
      );

      if (!updatedActiveOrders) {
        await ctx.reply("Что-то пошло не так, повторите позже...");
        return;
      }

      await ctx.reply("Завершенные заказы");

      return updatedActiveOrders.map(async (orders) => {
        await ctx.reply(showOrderContent(orders.order, userId));
      });
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getCompletedOrders };
