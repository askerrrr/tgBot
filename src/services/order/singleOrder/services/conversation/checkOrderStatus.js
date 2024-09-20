const { sendOrderToServer } = require("../sendOrderToServer");
const { sendOrderToAdmin } = require("../sendOrderToAdmin");

module.exports.checkOrderStatus = async (
  ctx,
  conversation,
  singleOrder,
  orderContent
) => {
  const status = await conversation.wait();

  if (status.msg.text == "Да, все правильно!") {
    await ctx.reply("Спасибо, скоро начнем обрабатывать заказ", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    await sendOrderToServer(orderContent);
    await sendOrderToAdmin(orderContent);
  } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
    await ctx.reply("Давайте исправим", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    return await singleOrder(conversation, ctx);
  }
};
