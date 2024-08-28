const { keyboardForTheMainMenu } = require("../../keyboard/keyboard");
const { listenerForSingleOrder } = require("./singleOrder");
const { listenerForMultipleOrder } = require("./multipleOrder");

async function listenersForOrder(bot) {
  listenerForSingleOrder(bot);
  listenerForMultipleOrder(bot);

  bot.hears("Основное меню", async (ctx) => {
    await ctx.reply("Меню", {
      reply_markup: keyboardForTheMainMenu,
    });
  });
}
module.exports = { listenersForOrder };
