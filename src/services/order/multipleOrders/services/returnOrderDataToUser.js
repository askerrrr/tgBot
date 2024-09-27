const { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

async function returnOrderDataToUser(ctx, order) {
  await ctx.reply(`Ваша ссылка : ${order.fileURL}`);
  await ctx.reply(`Номер телефона : ${order.phone}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
}

module.exports = { returnOrderDataToUser };
