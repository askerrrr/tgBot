const { FAQText } = require("../../utils/text");

async function FAQ(bot) {
  bot.hears("Часто задаваемые вопросы FAQ", async (ctx) => {
    await ctx.reply(FAQText, {
      parse_mode: "HTML",
    });
  });
}

module.exports = { FAQ };
