const { addNewOrder } = require("../../../database/services/addNewOrder");
const { sendOrderFileToAdmin } = require("../services/sendOrderFileToAdmin");
const {
  sendOrderDocumentToServer,
} = require("../services/sendOrderDocumentToServer");

async function checkOrderStatus(ctx, conversation, order, makingAnOrder) {
  const status = await conversation.wait();

  if (status.msg.text == "Да, все правильно!") {
    await ctx.reply(
      `Спасибо, скоро начнем обрабатывать заказ.\nID вашего заказа : ${order.file.id}`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );

    await addNewOrder(order);
    await sendOrderFileToAdmin(ctx, order);
    await sendOrderDocumentToServer(order);
  } else if (status.msg.text == "Нет, тут ошибка, я хочу исправить данные") {
    await ctx.reply("Давайте исправим", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    return await makingAnOrder(conversation, ctx);
  }
}

module.exports = { checkOrderStatus };
