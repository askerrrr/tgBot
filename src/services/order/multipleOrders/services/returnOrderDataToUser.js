const { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");
const { getFileUrl } = require("../../../different/getFileURL");

async function returnOrderDataToUser(ctx, order) {
  const filePath = await getFileUrl(ctx, order.fileId);

  await ctx.replyWithDocument(order.fileId);
  await ctx.reply(filePath);
  await ctx.reply(`Номер телефона : ${order.userPhoneNumber}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
}

module.exports = { returnOrderDataToUser };
