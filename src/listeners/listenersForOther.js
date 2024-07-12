const {
  keyboardForTheMainMenu,
  keyboardForDownloadingApp,
  keyboardForOtherQueries,
  keyboardForAppGuides,
} = require("../keyboard/keyboard");

function listenersForOther(bot) {
  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });

  bot.hears("Гайд по приложениям", async (ctx) => {
    await ctx.reply("Гайды по приложениям", {
      reply_markup: keyboardForAppGuides,
    });
  });

  bot.hears("Скачать приложения", async (ctx) => {
    await ctx.reply("Выберите приложения", {
      reply_markup: keyboardForDownloadingApp,
    });
  });

  bot.hears("Назад", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboardForOtherQueries,
    });
  });
}

module.exports = { listenersForOther };
