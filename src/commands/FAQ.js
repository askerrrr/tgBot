const { inlineKeyboardForFAQ } = require("../keyboard/inlineKeyboard");

async function FAQ(ctx) {
  await ctx.reply("Часто задаваемые вопросы", {
    reply_markup: inlineKeyboardForFAQ,
  });
}

module.exports = { FAQ };
