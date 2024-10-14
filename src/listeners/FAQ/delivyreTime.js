async function delivyreTime(bot) {
  bot.hears("Что по срокам доставки?", async (ctx) => {
    await ctx.reply("");
  });
}

module.exports = { delivyreTime };
