const { linkForAppPoizon } = require("../../utils/text");

async function showLinksForPoizon(conversation, ctx) {
  await ctx.reply(linkForAppPoizon, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

module.exports = { showLinksForPoizon };
