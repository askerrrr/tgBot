var { getOrders } = require("./getOrders");
var { showOrder } = require("./showOrderContent");
var { findOrder } = require("../../database/services/findOrder");
var {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.getCompletedOrders = async (bot) => {
  try {
    bot.hears("Завершенные заказы", async (ctx) => {
      var userId = ctx.chat.id;

      var orders = await getOrders(userId, ctx);

      var completed = orders?.completedOrders;
      if (!orders || completed.length < 1)
        return await currentCompletedOrders(ctx, userId);

      await Promise.all(
        completed.map(async (order) => await updateOrderStatus(ctx, order))
      );

      return completed.map(async (order) => await ctx.reply(showOrder(order)));
    });
  } catch (err) {
    console.log(err);
  }
};

var currentCompletedOrders = async (ctx, userId) => {
  var completed = await findOrder(userId).then((order) => order.completed());

  if (!completed || completed.length == 0)
    return await ctx.reply("Завершенных заказов не найдено");

  completed.forEach(
    async (orders) => await ctx.reply(showOrder(orders.order, userId))
  );
};
