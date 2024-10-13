const { keyboardForAppGuides } = require("../../keyboard/keyboard");
const { messageForNonReadyFunctions } = require("../../utils/text");

async function howToPlaceAnOrder(bot) {
  bot.hears("Как сделать заказ?", async (ctx) => {
    await ctx.reply(messageForNonReadyFunctions);
    // await ctx.reply("Руководство по магазинам", {
    //   reply_markup: keyboardForAppGuides,
    // });
  });
}

module.exports = { howToPlaceAnOrder };
