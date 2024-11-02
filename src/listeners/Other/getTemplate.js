const { InputFile } = require("grammy");

async function getTemplate(bot) {
  bot.hears("Получить шаблон", async (ctx) => {
    await ctx.replyWithDocument(
      new InputFile("/home/testbot/tgbot/srs/utils/шаблон.xlsx")
    );
  });
}

module.exports = { getTemplate };
