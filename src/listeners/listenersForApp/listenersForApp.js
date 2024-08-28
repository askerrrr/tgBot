const { link1688 } = require("./1688");
const { linkTaobao } = require("./Taobao");
const { linkPoizon } = require("./Poizon");
const { linkPinduoduo } = require("./Pinduoduo");
const { keyboardForDownloadingApp } = require("../../keyboard/keyboard");

function listenersForApp(bot) {
  link1688(bot);
  linkTaobao(bot);
  linkPoizon(bot);
  linkPinduoduo(bot);

  bot.hears("К приложениям", async (ctx) => {
    await ctx.reply("Выберите приложения", {
      reply_markup: keyboardForDownloadingApp,
    });
  });
}

module.exports = { listenersForApp };
