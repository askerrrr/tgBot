const { env } = require("../../../env");

module.exports.guideFor1688 = async (bot) => {
  const guideURL = `Посмотреть гайд на youtube ${env.guideURL1688}`;

  bot.hears("Гайд по 1688", async (ctx) => {
    await ctx.reply(guideURL, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
};
