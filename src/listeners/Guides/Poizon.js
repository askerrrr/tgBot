const { env } = require("../../../env");

async function guideForPoizon(bot) {
  const guideURL = `Посмотреть гайд на youtube ${env.guideURLPoizon}`;

  bot.hears("Гайд по Ponzon", async (ctx) => {
    await ctx.reply(guideURL, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
}

module.exports = { guideForPoizon };
