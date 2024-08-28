async function orderCost(bot) {
  bot.hears("Рассчитать стоимость заказа", async (ctx) => {
    await ctx.conversation.enter("calcOrderCost");
  });
}

module.exports = { orderCost };
