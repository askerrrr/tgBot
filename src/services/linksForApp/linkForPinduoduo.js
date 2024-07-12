const { linkForAppPinduoduo } = require("../../utils/text");

async function showLinksForPinduoduo(conversation, ctx) {
  await ctx.reply(linkForAppPinduoduo, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

module.exports = { showLinksForPinduoduo };
