async function listenerForSingleOrder(bot) {
  bot.hears("Хочу заказать один товар", async (ctx) => {
    await ctx.conversation.enter("singleOrder");
  });
}

module.exports = { listenerForSingleOrder };
