const { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

async function returnOrderDataToUser(ctx, phone, fileId) {
  await ctx.reply("Ваш файл");
  await ctx.replyWithDocument(fileId);
  await ctx.reply(`Номер телефона : ${phone}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
}

module.exports = { returnOrderDataToUser };
