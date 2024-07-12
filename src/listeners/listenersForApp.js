const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { session } = require("grammy");
const { keyboardForDownloadingApp } = require("../keyboard/keyboard");
const {
  linkForApp1688,
  linkForAppTaobao,
  linkForAppPoizon,
  linkForAppPinduoduo,
} = require("../utils/text");

function listenersForApp(bot) {
  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
  bot.use(createConversation(showLinksFor1688));
  bot.use(createConversation(showLinksForTaobao));
  bot.use(createConversation(showLinksForPoizon));
  bot.use(createConversation(showLinksForPinduoduo));

  async function showLinksFor1688(conversation, ctx) {
    await ctx.reply(linkForApp1688, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }

  async function showLinksForTaobao(conversation, ctx) {
    await ctx.reply(linkForAppTaobao, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }

  async function showLinksForPoizon(conversation, ctx) {
    await ctx.reply(linkForAppPoizon, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }

  async function showLinksForPinduoduo(conversation, ctx) {
    await ctx.reply(linkForAppPinduoduo, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }
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
