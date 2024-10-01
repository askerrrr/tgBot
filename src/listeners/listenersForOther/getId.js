async function getId(bot) {
  bot.hears("Получить свой id", async (ctx) => {
    const chatId = ctx.chat.id;
    await ctx.reply(`Ваш ID : ${chatId}`);
  });
}

module.exports = { getId };
