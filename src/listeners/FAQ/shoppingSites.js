const { shoppingSitesText } = require("../../utils/text");

async function shoppingSites(bot) {
  bot.hears("Маркеплейсы с которыми работаем", async (ctx) => {
    await ctx.reply(shoppingSitesText);
  });
}

module.exports = { shoppingSites };
