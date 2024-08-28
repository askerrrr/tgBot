const { keyboardForDownloadingApp } = require("../../keyboard/keyboard");

async function downloadApp(bot) {
  bot.hears("Скачать приложения", async (ctx) => {
    await ctx.reply("Выберите приложения", {
      reply_markup: keyboardForDownloadingApp,
    });
  });
}
module.exports = { downloadApp };
