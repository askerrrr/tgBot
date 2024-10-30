const { deliveryCostText } = require("../../../utils/text");

async function deliveryCost(bot) {
  bot.hears("Стоимость доставки", async (ctx) => {
    await ctx.reply(deliveryCostText);
  });
}

module.exports = { deliveryCost };
