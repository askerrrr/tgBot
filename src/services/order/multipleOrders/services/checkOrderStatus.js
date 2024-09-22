const { sendOrderFileToAdmin } = require("./sendOrderFileToAdmin");
const { sendOrderDocumentToServer } = require("./sendOrderDocumentToServer");

module.exports.checkOrderStatus = async (
  ctx,
  conversation,
  order,
  multipleOrders
) => {
  const status = await conversation.wait();

  if (status.msg.text == "Да, все правильно!") {
    await ctx.reply("Спасибо, скоро начнем обрабатывать заказ", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    await sendOrderFileToAdmin(order);
    await sendOrderDocumentToServer(order);
  } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
    await ctx.reply("Давайте исправим", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    return await multipleOrders(conversation, ctx);
  }
};
