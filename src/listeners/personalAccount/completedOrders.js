const { showOrderContent } = require("./showOrderContent");
const {
  findCompletedOrder,
} = require("../../database/services/findCompletedOrder");
const { updateCurrentOrderStatus } = require("./updateCurrentOrderStatus");

async function getCompletedOrders(bot) {
  try {
    bot.hears("Завершенные заказы", async (ctx) => {
      const userId = ctx.chat.id;

      const completedOrders = await findCompletedOrder(userId);
      console.log("active", completedOrders);
      if (!completedOrders) await ctx.reply("Активных заказов не найдено");

      const statusUpdatePromises = completedOrders.map((order) =>
        updateCurrentOrderStatus(order, ctx)
      );

      const result = await Promise.all(statusUpdatePromises);

      if (result) {
        console.log("Статусы активных заказов обновлены", result);
        const updatedActiveOrders = await findCompletedOrder(userId);
        if (!updatedActiveOrders) {
          console.log("Ошибка при повторном поиск активных заказов");
          await ctx.reply("Что-то пошло не так, повторите позже...");
        }

        await ctx.reply("Завершенные заказы");

        return updatedActiveOrders.map(async (orders) => {
          await ctx.reply(showOrderContent(orders.order));
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getCompletedOrders };
