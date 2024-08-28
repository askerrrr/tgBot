const { linkForAppTaobao } = require("../../utils/text");

async function linkTaobao(bot) {
  bot.hears("Taobao", async (ctx) => {
    await ctx.reply(linkForAppTaobao, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
}
module.exports = { linkTaobao };
