const { linkForAppTaobao } = require("../../utils/text");

async function showLinksForTaobao(conversation, ctx) {
  await ctx.reply(linkForAppTaobao, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

module.exports = { showLinksForTaobao };
