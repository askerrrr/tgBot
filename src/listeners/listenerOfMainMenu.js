const { keyboardForOtherQueries } = require("../keyboard/keyboard");
const { FAQ, botText } = require("../utils/text");
const { getCNY, getDate } = require("../services/currencyExtraction");

function listenerOfMainMenu(bot) {
  bot.hears("Сделать заказ!", async (ctx) => {
    await ctx.reply(
      "Отправьте нам ссылку на товар, фотографию самого товара, размер(если это одежда или обувь) и количество"
    );
  });

  bot.hears("Как сделать заказ?", async (ctx) => {
    await ctx.reply(botText);
  });

  bot.hears("Рассчитать стоимость заказа", async (ctx) => {
    try {
      const valute = await getCNY();

      await ctx.reply(
        `Курс на ${getDate()} ${valute.Valute.CNY.Value + 1.5} рублей за 1 юань`
      );
    } catch (err) {
      console.log(err);
    }
  });

  bot.hears("Часто задаваемые вопросы FAQ", async (ctx) => {
    await ctx.reply(FAQ, {
      parse_mode: "HTML",
    });
  });

  bot.hears("Другое", async (ctx) => {
    await ctx.reply("Другое", {
      reply_markup: keyboardForOtherQueries,
    });
  });
}

module.exports = { listenerOfMainMenu };
