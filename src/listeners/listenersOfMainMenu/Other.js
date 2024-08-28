const { keyboardForOtherQueries } = require("../../keyboard/keyboard");

async function other(bot) {
  bot.hears("Другое", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboardForOtherQueries,
    });
  });
}

module.exports = { other };
