async function order(bot) {
  bot.hears("Сделать заказ!", async (ctx) => {
    await ctx.conversation.enter("makingAnOrder");
  });
}

module.exports = { order };
