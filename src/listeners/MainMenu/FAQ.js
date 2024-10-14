const { keyboardForFAQ } = require("../../keyboard/keyboard");

async function FAQ(bot) {
  bot.hears("Часто задаваемые вопросы FAQ", async (ctx) => {
    await ctx.reply("Вот часто задаваемые вопросы", {
      reply_markup: keyboardForFAQ,
    });
  });
}

module.exports = { FAQ };
