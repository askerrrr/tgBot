const { keyboardForSingleOrder } = require("../../../../keyboard/keyboard");
const { checkStrLength } = require("./checkStrLength");

async function returnOrderDataToUserForVerification(ctx, orderInfo) {
  await ctx.reply(`Ссылка : ${orderInfo.url}`, {
    disable_web_page_preview: true,
  });

  await checkStrLength(orderInfo.quantityAndSize, ctx);

  await ctx.replyWithPhoto(`${orderInfo.image}`);

  await ctx.reply(`Ваш номер телефона : ${orderInfo.userPhoneNumber.msg.text}`);

  await ctx.reply("Все правильно?", {
    reply_markup: keyboardForSingleOrder,
  });
}

module.exports = { returnOrderDataToUserForVerification };
