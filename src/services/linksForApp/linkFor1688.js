const { linkForApp1688 } = require("../../utils/text");
async function showLinksFor1688(conversation, ctx) {
  await ctx.reply(linkForApp1688, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

module.exports = { showLinksFor1688 };
