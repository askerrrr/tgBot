const {
  keyboardForOtherQueries,
  keyboardForOrder,
  keyboardForAppGuides,
} = require("../keyboard/keyboard");
const { FAQ } = require("../utils/text");
const { getCNY } = require("../services/different/currencyExtraction");
const {
  shortingStringAndConvertToNumber,
} = require("../services/different/shortingStringAndConvertToNumber");
const { getDateAndTime } = require("../services/different/dateAndTime");

async function listenerOfMainMenu(bot) {
  bot.hears("Сделать заказ!", async (ctx) => {
    await ctx.reply("Выберите один из вариантов", {
      reply_markup: keyboardForOrder,
    });
  });

  bot.hears("Как сделать заказ?", async (ctx) => {
    await ctx.reply("Руководство по магазинам", {
      reply_markup: keyboardForAppGuides,
    });
  });

  bot.hears("Рассчитать стоимость заказа", async (ctx) => {
    try {
      const valute = await getCNY();
      const CNY = shortingStringAndConvertToNumber(valute);

      await ctx.reply(
        `Курс - ${CNY + 1.3} рублей за 1 юань на ${getDateAndTime().getDate()}`
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
