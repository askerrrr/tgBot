const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function multipleOrders(conversation, ctx) {
  const chatId = ctx.chat.id;

  await ctx.reply("Пришлите документ с вашими товарами");

  const { message } = await conversation.waitFor("message:document");
  const fileId = message.document.file_id;

  await ctx.reply("Документ получили, а теперь напишите номер вашего телефона");

  let userPhoneNumber = await conversation.wait();
  userPhoneNumber = userPhoneNumber.msg.text;
  //const fileId = await getFile(ctx, conversation);
  //const phone = await getPhone(ctx, conversation);

  const order = { chatId, fileId, userPhoneNumber };

  await returnOrderDataToUser(ctx, order);
  await checkOrderStatus(ctx, conversation, order, multipleOrders);
}

module.exports = { multipleOrders }; //экспорт в src\middleware\middleware.js
