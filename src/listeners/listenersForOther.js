const {
  keyboardForTheMainMenu,
  keyboardForDownloadingApp,
  keyboardForOtherQueries,
} = require("../keyboard/keyboard");

const { env } = require("../../env");

function listenersForOther(bot) {
  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });

  bot.hears("Пришли шаблон", async (ctx) => {
    await ctx.replyWithDocument(env.file_id);
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
