const { middlewareForApp } = require("../middleware/middlewareForApp");

const { keyboardForDownloadingApp } = require("../keyboard/keyboard");

function listenersForApp(bot) {
  middlewareForApp(bot);

  bot.hears("1688", async (ctx) => {
    await ctx.conversation.enter("showLinksFor1688");
  });

  bot.hears("Taobao", async (ctx) => {
    await ctx.conversation.enter("showLinksForTaobao");
  });

  bot.hears("Poizon", async (ctx) => {
    await ctx.conversation.enter("showLinksForPoizon");
  });

  bot.hears("Pinduoduo", async (ctx) => {
    await ctx.conversation.enter("showLinksForPinduoduo");
  });

  bot.hears("К приложениям", async (ctx) => {
    await ctx.reply("Выберите приложения", {
      reply_markup: keyboardForDownloadingApp,
    });
  });
}

module.exports = { listenersForApp };
