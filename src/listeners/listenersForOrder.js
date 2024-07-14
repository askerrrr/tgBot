const { keyboardForTheMainMenu } = require("../keyboard/keyboard");

async function listenersForOrder(bot) {
  bot.hears("Хочу заказать один товар", async (ctx) => {
    await ctx.conversation.enter("singleOrder");
  });

  bot.hears("Хочу заказать несколько товаров", async (ctx) => {
    await ctx.conversation.enter("multipleOrders");
  });

  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });
}
module.exports = { listenersForOrder };
