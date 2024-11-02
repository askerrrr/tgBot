const { showActiveOrder } = require("./showActiveOrder");
const { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");
const { findActiveOrder } = require("../../database/services/findActiveOrder");

async function getActiveOrders(bot) {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      const userId = ctx.chat.id;

      const activeOrders = await findActiveOrder(userId);
      if (!activeOrders) await ctx.reply("Активных заказов не найдено");

      const statusUpdatePromises = activeOrders.map((order) =>
        updateCurrentOrderStatus(order, ctx)
      );

      const result = await Promise.all(statusUpdatePromises);

      if (result) {
        console.log("Статусы активных заказов обновлены", result);
        const updatedActiveOrders = await findActiveOrder(userId);
        if (!updatedActiveOrders) {
          console.log("Ошибка при повторном поиск активных заказов");
          await ctx.reply("Что-то пошло не так, повторите позже...");
        }

        updatedActiveOrders.forEach((orders) =>
          ctx.reply(showActiveOrder(orders.order))
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getActiveOrders };
