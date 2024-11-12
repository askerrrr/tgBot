const { sendOrderToServer } = require("../services/sendOrderToServer");

module.exports.checkOrderStatus = async (
  ctx,
  conversation,
  single,
  order,
  imageId
) => {
  try {
    const status = await conversation.wait();

    if (status.msg.text == "Да, все правильно!") {
      await ctx.reply("Спасибо, скоро начнем обрабатывать заказ", {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      return await sendOrderToServer(order, ctx, imageId);
    } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
      await ctx.reply("Давайте исправим", {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      return await single(conversation, ctx);
    }
  } catch (err) {
    console.log(err);
  }
};
