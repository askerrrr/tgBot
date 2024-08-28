async function listenerForMultipleOrder(bot) {
  bot.hears("Хочу заказать несколько товаров", async (ctx) => {
    await ctx.conversation.enter("multipleOrders");
  });
}

module.exports = { listenerForMultipleOrder };
