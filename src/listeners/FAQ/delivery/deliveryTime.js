const { deliveryTimeText } = require("../../../utils/text");

async function deliveryTime(bot) {
  bot.hears("Сроки доставки", async (ctx) => {
    await ctx.reply(deliveryTimeText);
  });
}

module.exports = { deliveryTime };
