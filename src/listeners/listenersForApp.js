//const { middlewareForApp } = require("../middleware/middlewareForApp");
const {
  linkForApp1688,
  linkForAppTaobao,
  linkForAppPoizon,
  linkForAppPinduoduo,
} = require("../utils/text");

const { keyboardForDownloadingApp } = require("../keyboard/keyboard");

function listenersForApp(bot) {
  bot.hears("1688", async (ctx) => {
    await ctx.reply(linkForApp1688, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });

  bot.hears("Taobao", async (ctx) => {
    await ctx.reply(linkForAppTaobao, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });

  bot.hears("Poizon", async (ctx) => {
    await ctx.reply(linkForAppPoizon, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });

  bot.hears("Pinduoduo", async (ctx) => {
    await ctx.reply(linkForAppPinduoduo, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });

  bot.hears("К приложениям", async (ctx) => {
    await ctx.reply("Выберите приложения", {
      reply_markup: keyboardForDownloadingApp,
    });
  });
}

module.exports = { listenersForApp };
