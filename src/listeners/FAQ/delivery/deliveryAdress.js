const { deliveryAddressText } = require("../../../utils/text");

async function deliveryAddress(bot) {
  bot.hears("Адрес доставки", async (ctx) => {
    await ctx.reply(deliveryAddressText);
  });
}

module.exports = { deliveryAddress };
