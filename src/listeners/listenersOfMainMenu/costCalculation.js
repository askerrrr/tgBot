async function costCalculation(bot) {
  bot.hears("Рассчитать стоимость заказа", async (ctx) => {
    await ctx.conversation.enter("calculationOfTheOrderCost");
  });
}
module.exports = { costCalculation };
