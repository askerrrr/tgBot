var { showOrderContent } = require("./showOrderContent");
var { findOrder } = require("../../database/services/findOrder");
var { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");

module.exports.getCompletedOrders = async (bot) => {
  try {
    bot.hears("Завершенные заказы", async (ctx) => {
      var userId = ctx.chat.id;

      var completedOrders = await findOrder(userId).then((order) =>
        order.completed()
      );

      if (!completedOrders || completedOrders.length < 1) {
        await ctx.reply("Завершенных заказов не найдено");

        return;
      }

      var statusUpdatePromises = completedOrders.map(
        async (order) =>
          await updateCurrentOrderStatus(order).catch((err) => {
            console.log(err);

            return;
          })
      );

      var result = await Promise.all(statusUpdatePromises);

      if (!result || result.includes(null) || result.includes(undefined)) {
        await ctx.reply(
          `Не удалось запросить новые статусы для активных заказов.\nПоэтому покажу активные заказы с текущими статусами `
        );

        return completedOrders.map(
          async (orders) =>
            await ctx.reply(showOrderContent(orders.order, userId))
        );
      }

      var updatedActiveOrders = await findOrder(userId).then((order) =>
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
};
