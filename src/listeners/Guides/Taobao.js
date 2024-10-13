const { env } = require("../../../env");

async function guideForTaobao(bot) {
  const guideURL = `Посмотреть гайд на youtube ${env.guideURLTaobao}`;

  bot.hears("Гайд по Taobao", async (ctx) => {
    await ctx.reply(guideURL, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
}

module.exports = { guideForTaobao };
