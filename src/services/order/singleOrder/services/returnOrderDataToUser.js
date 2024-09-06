const { keyboardForSingleOrder } = require("../../../../keyboard/keyboard");
const { checkStrLength } = require("./checkStrLength");

async function returnOrderDataToUserForVerification(
  url,
  quantityAndSize,
  ctx,
  image,
  userPhoneNumber
) {
  await ctx.reply(`Ссылка : ${url}`, {
    disable_web_page_preview: true,
  });

  await checkStrLength(quantityAndSize, ctx);

  await ctx.replyWithPhoto(`${image}`);

  await ctx.reply(`Ваш номер телефона : ${userPhoneNumber.msg.text}`);

  await ctx.reply("Все правильно?", {
    reply_markup: keyboardForSingleOrder,
  });
}

module.exports = { returnOrderDataToUserForVerification };
