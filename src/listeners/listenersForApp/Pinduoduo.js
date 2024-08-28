const { linkForAppPinduoduo } = require("../../utils/text");

async function linkPinduoduo(bot) {
  bot.hears("Pinduoduo", async (ctx) => {
    await ctx.reply(linkForAppPinduoduo, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
}

module.exports = { linkPinduoduo };
