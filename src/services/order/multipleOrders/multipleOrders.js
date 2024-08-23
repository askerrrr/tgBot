const { sendOrderFileToAdmin } = require("./services/sendOrderFileToAdmin");


async function multipleOrders(conversation, ctx) {
  await ctx.reply("Пришлите документ с вашими товарами");
  const { message } = await conversation.waitFor("message:document");
  const fileId = message.document.file_id;

  await ctx.reply("Документ получили, а теперь напишите номер вашего телефона");
  let userPhoneNumber = await conversation.wait();
  userPhoneNumber = userPhoneNumber.msg.text;

  await ctx.reply("Спасибо, скоро мы займемся вашим заказом!");
  await sendOrderFileToAdmin(ctx, fileId, userPhoneNumber);
}

module.exports = { multipleOrders }; //экспорт в src\middleware\middleware.js
