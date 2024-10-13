const { linkForApp1688 } = require("../../utils/text");

async function link1688(bot) {
  bot.hears("1688", async (ctx) => {
    await ctx.reply(linkForApp1688, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
}

module.exports = {link1688}