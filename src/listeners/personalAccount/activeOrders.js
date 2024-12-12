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
      var active = orders?.activeOrders;

      if (!orders || active.length < 1)
        return await currentActiveOrders(ctx, userId);

      await Promise.all(
        active.map(async (order) => await updateOrderStatus(ctx, order))
      );

      return active.map(async (order) => await ctx.reply(showOrder(order)));
    });
  } catch (err) {
    console.error(err);
  }
};

var currentActiveOrders = async (ctx, userId) => {
  var active = await findOrder(userId).then((order) => order.active());

  if (!active || active.length < 1)
    return await ctx.reply("Активных заказов не найдено");

  active.forEach(
    async (orders) => await ctx.reply(showOrder(orders.order, userId))
  );
};
