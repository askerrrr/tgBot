const env = require("../../../env");

async function multipleOrders(conversation, ctx) {
  await ctx.reply("Пришлите документ с вашими товарами");
  const { message } = await conversation.waitFor("message:document");
  const document = message.document;
  const fileId = document.file_id;

  await ctx.reply("Документ получили, а теперь напишите номер вашего телефона");
  const userPhoneNumber = await conversation.wait();

  await ctx.reply("Спасибо, скоро мы займемся вашим заказом!");
  await ctx.api.sendDocument(env.adminId, fileId);
  await ctx.api.sendMessage(env.adminId, userPhoneNumber.msg.text);
}

module.exports = { multipleOrders }; //экспорт в src\middleware\middleware.js
