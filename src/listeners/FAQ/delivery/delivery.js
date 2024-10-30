const { backToFAQ } = require("./backToFAQ");
const { deliveryCost } = require("./deliveryCost");
const { deliveryTime } = require("./deliveryTime");
const { deliveryAddress } = require("./deliveryAdress");
const { keyboardForDelivery } = require("../../../keyboard/keyboard");

async function delivery(bot) {
  bot.hears("Доставка", async (ctx) => {
    await ctx.reply("Вот варианты", {
      reply_markup: keyboardForDelivery,
    });
  });

  backToFAQ(bot);
  deliveryCost(bot);
  deliveryTime(bot);
  deliveryAddress(bot);
}

module.exports = { delivery };
