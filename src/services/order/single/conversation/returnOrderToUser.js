var { checkStrLength } = require("../../services/checkStrLength");
var { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

module.exports.returnOrderToUser = async (
  ctx,
  url,
  phone,
  imageId,
  description
) => {
  await ctx.reply(`Ваша ссылка : ${url} `);
  await ctx.reply("Фото");
  await ctx.replyWithPhoto(imageId);
  await ctx.reply(checkStrLength(description));
  await ctx.reply(`Телефон : ${phone}`);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
};
// `Описание :\n
//   Количество : ${description.quantity}\n
//   Размер : ${description.size}\n`
