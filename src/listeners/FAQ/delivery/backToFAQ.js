const { keyboardForFAQ } = require("../../../keyboard/keyboard");

async function backToFAQ(bot) {
  bot.hears("Назад к вопросам", async (ctx) => {
    await ctx.reply("Вот часто задаваемые вопросы", {
      reply_markup: keyboardForFAQ,
    });
  });
}

module.exports = { backToFAQ };
