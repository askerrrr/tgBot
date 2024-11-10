const { InputFile } = require("grammy");

async function getTemplate(bot) {
  bot.hears("Получить шаблон", async (ctx) => {
    await ctx.replyWithDocument(new InputFile("src/utils/template.xlsx"));
  });
}

module.exports = { getTemplate };
