const { keyboardForСheckingnOrder } = require("../../../keyboard/keyboard");

async function returnOrderDataToUser(ctx, order) {
  const fileId = order.file.url.split("/")[4].split(":")[1];
  console.log(fileId);
  await ctx.replyWithDocument(`${fileId}`);
  await ctx.reply(`Номер телефона : ${order.phone}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
}

module.exports = { returnOrderDataToUser };
