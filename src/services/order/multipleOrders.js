async function multipleOrders(conversation, ctx) {
  await ctx.reply("Пришлите документ с вашими товарами");
  const { message } = await conversation.waitFor("message:document");
  const document = message.document;
  const fileId = document.file_id;

  await ctx.reply("Документ получили, а теперь напишите номер вашего телефона");
  const userPhoneNumber = await conversation.wait();

  await ctx.reply("Спасибо, скоро мы займемся вашим заказом!");
  await ctx.api.sendDocument("5364121551", fileId);
  await ctx.api.sendMessage("5364121551", userPhoneNumber.msg.text);
}

module.exports = { multipleOrders }; //экспорт в src\middleware\middleware.js
