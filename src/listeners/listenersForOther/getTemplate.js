const { InputFile } = require("grammy");

async function getTemplate(bot) {
  bot.hears("Получить шаблон", async (ctx) => {
    await ctx.replyWithDocument(
      new InputFile("/home/phosphorus/botDir/tgbot/шаблон.xlsx")
    );
  });
}

module.exports = { getTemplate };
