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

      var completedOrders = orders?.completedOrders;
      if (!orders || completedOrders.length < 1)
        return await currentCompletedOrders(ctx, userId);

      await Promise.all(
        completedOrders.map(async (order) => await updateOrderStatus(order))
      );

      return completedOrders.map(
        async (order) => await ctx.reply(showOrder(order))
      );
    });
  } catch (err) {
    console.log(err);
  }
};

var currentCompletedOrders = async (ctx, userId) => {
  var completedOrders = await findOrder(userId).then((order) =>
    order.completed()
  );

  if (!completedOrders || completedOrders.length == 0)
    return await ctx.reply("Завершенных заказов не найдено");

  completedOrders.forEach(
    async (orders) => await ctx.reply(showOrder(orders.order, userId))
  );
};
