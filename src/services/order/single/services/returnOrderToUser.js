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
  await ctx.reply(`Описание :\n
  Количество : ${description.quantity}\n
  Размер : ${description.size}\n`);

  await ctx.reply(`Номер телефона : ${phone}`);

  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
};
