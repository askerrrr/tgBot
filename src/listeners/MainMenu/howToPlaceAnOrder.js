const { keyboardForAppGuides } = require("../../keyboard/keyboard");
const { messageForNonReadyFunctions } = require("../../utils/text");

module.exports.howToPlaceAnOrder = async (bot) => {
  bot.hears("Как сделать заказ?", async (ctx) => {
    await ctx.reply(messageForNonReadyFunctions);
    // await ctx.reply("Руководство по магазинам", {
    //   reply_markup: keyboardForAppGuides,
    // });
  });
};
