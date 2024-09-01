const { env } = require("../../../env");

async function guideFor1688(bot) {
  const guideURL = `Посмотреть гайд на youtube ${env.guideURL1688}`;

  bot.hears("Гайд по 1688", async (ctx) => {
    await ctx.reply(guideURL, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
}

module.exports = { guideFor1688 };
