const { getFileUrl } = require("../../../different/getFileURL");
const { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

async function returnOrderDataToUser(ctx, order) {
  const filePath = await getFileUrl(ctx, order.fileId);

  await ctx.replyWithDocument(order.fileId);
  await ctx.reply(`Номер телефона : ${order.phone}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
}

module.exports = { returnOrderDataToUser };
