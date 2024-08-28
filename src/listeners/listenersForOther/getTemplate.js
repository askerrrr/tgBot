const { env } = require("../../../env");

async function getTemplate(bot) {
  bot.hears("Пришли шаблон", async (ctx) => {
    await ctx.replyWithDocument(env.file_id);
  });
}

module.exports = { getTemplate };
