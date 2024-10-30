const { keyboardForPersonalAccount } = require("../../keyboard/keyboard");

async function personalAccount(bot) {
  bot.hears("Личный кабинет", async (ctx) => {
    await ctx.reply("Личный кабинет", {
      reply_markup: keyboardForPersonalAccount,
    });
  });
}

module.exports = { personalAccount };
