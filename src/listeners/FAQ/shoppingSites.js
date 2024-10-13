async function shoppingSites(bot) {
  bot.callbackQuery("shoppingSites", async (ctx) => {
    await ctx.answerCallbackQuery({ text: "sadfsdf" });
  });
}

module.exports = { shoppingSites };
