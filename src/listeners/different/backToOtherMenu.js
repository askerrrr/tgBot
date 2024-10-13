const { keyboardForOtherQueries } = require("../../keyboard/keyboard");

async function backToOtherMenu(bot) {
  bot.hears("Назад", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboardForOtherQueries,
    });
  });
}

module.exports = { backToOtherMenu };
