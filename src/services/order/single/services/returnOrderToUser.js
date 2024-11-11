const { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

module.exports.returnOrderToUser = async (
  ctx,
  url,
  phone,
  imageId,
  description
) => {
  await ctx.reply(`Ваша ссылка : ${url} `);
  await ctx.reply("Ваш файл");
  await ctx.replyWithPhoto(imageId);
  await ctx.reply(`Описание : ${description}`);
  await ctx.reply(`Номер телефона : ${phone}`);

  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
};
