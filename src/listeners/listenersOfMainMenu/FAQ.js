const { inlineKeyboardForFAQ } = require("../../keyboard/inlineKeyboard");

async function FAQ(bot) {
  bot.hears("Часто задаваемые вопросы FAQ", async (ctx) => {
    await ctx.reply("Вот часто задаваемые вопросы", {
      reply_markup: inlineKeyboardForFAQ,
    });
  });
}

module.exports = { FAQ };
