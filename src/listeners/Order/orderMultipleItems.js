async function orderMultipleItems(bot) {
  bot.hears("Заказать несколько товаров", async (ctx) => {
    await ctx.conversation.enter("multiple");
  });
}

module.exports = { orderMultipleItems }; //export to src\middleware\middleware.js
