async function deliveryAddress(bot) {
  bot.hears("Куда доставляете товар?", async (ctx) => {
    await ctx.reply("");
  });
}

module.exports = { deliveryAddress };
