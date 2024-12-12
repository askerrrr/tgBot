var { getOrders } = require("./getOrders");
var { showOrder } = require("./showOrderContent");
var { findOrder } = require("../../database/services/findOrder");
var {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.getActiveOrders = async (bot) => {
  try {
    bot.hears("Активные заказы", async (ctx) => {
      var userId = ctx.chat.id;

      var orders = await getOrders(userId, ctx);
      var activeOrders = orders?.activeOrders;

      if (!orders || activeOrders.length < 1)
        return await currentActiveOrders(ctx, userId);

      await Promise.all(
        activeOrders.map(async (order) => await updateOrderStatus(order))
      );

      return activeOrders.map(
        async (order) => await ctx.reply(showOrder(order))
      );
    });
  } catch (err) {
    console.error(err);
  }
};

var currentActiveOrders = async (ctx, userId) => {
  var activeOrders = await findOrder(userId).then((order) => order.active());

  if (!activeOrders || activeOrders.length < 1)
    return await ctx.reply("Активных заказов не найдено");

  activeOrders.forEach(
    async (orders) => await ctx.reply(showOrder(orders.order, userId))
  );
};
