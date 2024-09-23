const { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

async function returnOrderDataToUser(ctx, order) {
  await ctx.replyWithDocument(`Документ : ${order.fileId}`);
  await ctx.reply(`Номер телефона : ${order.userPhoneNumber}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
}

module.exports = { returnOrderDataToUser };
