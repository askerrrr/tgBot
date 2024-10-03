const { keyboardForUserData } = require("../../keyboard/keyboard");

async function getUserData(bot) {
  bot.hears("Мои данные", async (ctx) => {
    await ctx.reply("Ваши данные", {
      reply_markup: keyboardForUserData,
    });
  });
}

module.exports = { getUserData };
