const { env } = require("../../../env");

async function getTemplate(bot) {
  bot.hears("Получить шаблон", async (ctx) => {
    await ctx.reply(env.templateDocument, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  });
}

module.exports = { getTemplate };
