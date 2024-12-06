var { showOrderContent } = require("./showOrderContent");
var { findOrder } = require("../../database/services/findOrder");
var { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");

module.exports.getActiveOrders = async (bot) => {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      var userId = ctx.chat.id;

      var activeOrders = await findOrder(userId).then((order) =>
        order.active()
      );

      if (!activeOrders || activeOrders.length < 1) {
        await ctx.reply("Активных заказов не найдено");

        return;
      }

      var statusUpdatePromises = await activeOrders.map(
        async (order) => await updateCurrentOrderStatus(order)
      );

      var result = await Promise.all(statusUpdatePromises).catch((err) =>
        console.log(err)
      );

      if (!result || result.includes(null) || result.includes(undefined)) {
        await ctx.reply("Что-то пошло не так, повторите позже...");

        return;
      }

      var updatedActiveOrders = await findOrder(userId).then((order) =>
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
};
