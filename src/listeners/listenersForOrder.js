const { keyboardForOrder } = require("../keyboard/keyboard");
const { textForOneOrder } = require("../utils/text");

function listenersForOrder(bot) {
  bot.hears("Хочу заказать один товар", async (ctx) => {
    await ctx.reply(textForOneOrder);
  });
  bot.hears("Хочу заказать несколько товаров", async (ctx) => {
    await ctx.reply("Сейчас пришлем шаблон для заполнения...");
  });
}

module.exports = { listenersForOrder };
