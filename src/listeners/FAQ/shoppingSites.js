async function shoppingSites(bot) {
  bot.hears("С каких сайтов вы выкупаете?", async (ctx) => {
    await ctx.reply("");
  });
}

module.exports = { shoppingSites };
