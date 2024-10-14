async function serviceCost(bot) {
  bot.hears("Какова стоимость услуг?", async (ctx) => {
    await ctx.reply("");
  });
}

module.exports = { serviceCost };
