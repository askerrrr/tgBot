const { showOrderContent } = require("./showOrderContent");
const { findOrder } = require("../../database/services/findOrder");
const { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");

module.exports.getCompletedOrders = async (bot) => {
  try {
    bot.hears("Завершенные заказы", async (ctx) => {
      const userId = ctx.chat.id;

      const completedOrders = await (await findOrder(userId)).completed();

      if (!completedOrders || completedOrders.length < 1) {
        await ctx.reply("Завершенных заказов не найдено");

        return;
      }

      const statusUpdatePromises = completedOrders.map(
        async (order) =>
          await updateCurrentOrderStatus(order).catch((err) => {
            console.log(err);

            return;
          })
      );

      const result = await Promise.all(statusUpdatePromises);

      if (result.includes(null)) return;

      const updatedActiveOrders = await (await findOrder(userId)).completed();

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
};
