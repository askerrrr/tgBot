const {
  keyboardForTheMainMenu,
  keyboardForDownloadingApp,
  keyboardForOtherQueries,
  keyboardForAppGuides,
} = require("../keyboard/keyboard");
const { InputFile } = require("grammy");

const fs = require("fs");

function listenersForOther(bot) {
  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });

  bot.hears("Пришли шаблон", async (ctx) => {
    const url =
      "https://docs.google.com/spreadsheets/d/1APcCLIs87uZNGCTMdnOsCUR1utWItf-5MMKrDi7vRPM/edit?gid=0#gid=0";
    await ctx.reply(url);

    // await ctx.replyWithDocument(new InputFile("src/template/template.xlsx"));
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
// new InputFile(
//   fs.createReadStream(
//     "/home/phosphorus/botDir/bot/tgbot/src/utils/text.txt"
//   )
// )
