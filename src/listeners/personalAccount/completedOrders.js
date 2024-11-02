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

      if (!completedOrders || completedOrders.length < 1) {
        await ctx.reply("Завершенных заказов не найдено");
        return;
      }
      const statusUpdatePromises = completedOrders.map((order) =>
        updateCurrentOrderStatus(order, ctx)
      );

      const result = await Promise.all(statusUpdatePromises);

      if (result) {
        const updatedActiveOrders = await findCompletedOrder(userId);
        if (!updatedActiveOrders) {
          await ctx.reply("Что-то пошло не так, повторите позже...");
        }

        await ctx.reply("Завершенные заказы");

        return updatedActiveOrders.map(async (orders) => {
          await ctx.reply(showOrderContent(orders.order, userId));
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getCompletedOrders };
