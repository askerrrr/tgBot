const { keyboardForTheMainMenu } = require("../../keyboard/keyboard");
async function backToMainMenu(bot) {
  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });
}

module.exports = { backToMainMenu };
