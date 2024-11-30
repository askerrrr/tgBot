var { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

module.exports.returnOrderToUser = async (ctx, phone, fileId) => {
  await ctx.reply("Ваш файл");
  await ctx.replyWithDocument(fileId);
  await ctx.reply(`Номер телефона : ${phone}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
};
