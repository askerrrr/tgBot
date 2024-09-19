const { keyboardForSingleOrder } = require("../../../../keyboard/keyboard");
const { checkStrLength } = require("./checkStrLength");

async function returnOrderDataToUserForVerification(ctx, order) {
  await ctx.reply(`Ссылка : ${order.url}`, {
    disable_web_page_preview: true,
  });

  await checkStrLength(order.quantityAndSize, ctx);

  await ctx.replyWithPhoto(`${order.image}`);

  await ctx.reply(`Ваш номер телефона : ${order.userPhoneNumber.msg.text}`);

  await ctx.reply("Все правильно?", {
    reply_markup: keyboardForSingleOrder,
  });
}

module.exports = { returnOrderDataToUserForVerification };
