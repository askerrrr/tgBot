const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");

const {
  linkForApp1688,
  linkForAppTaobao,
  linkForAppPoizon,
  linkForAppPinduoduo,
} = require("../utils/text");

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

module.exports = {
  showLinksFor1688,
  showLinksForTaobao,
  showLinksForPoizon,
  showLinksForPinduoduo,
};
