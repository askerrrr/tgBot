const {
  keyboardForTheMainMenu,
  keyboardForOtherQueries,
} = require("../../keyboard/keyboard");
const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");

async function listenersForOther(bot) {
  getTemplate(bot);
  downloadApp(bot);

  bot.hears("Назад", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboardForOtherQueries,
    });
  });

  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });
}

module.exports = { listenersForOther };
