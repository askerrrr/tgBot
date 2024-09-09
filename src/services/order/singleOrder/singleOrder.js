const {
  sendOrderMessageToAdmin,
} = require("./services/sendOrderMessageToAdmin");
const {
  returnOrderDataToUserForVerification,
} = require("./services/returnOrderDataToUser");

const { sendOrderInfoToServer } = require("./services/sendOrderInfoToServer");

async function singleOrder(conversation, ctx) {
  await ctx.reply("Пришлите ссылку на товар");
  const urlCtx = await conversation.wait();
  const url = urlCtx.msg.text;

  await ctx.reply(
    "Теперь пришлите нам \n\n1)Количество товара \n2)Размер (если такой параметр имеется)"
  );
  const quantityAndSizeCtx = await conversation.wait();
  const quantityAndSize = String(quantityAndSizeCtx.msg.text).split(" ");

  await ctx.reply("Отправьте фото товара");

  const imageCtx = await conversation.wait();
  const image = imageCtx.msg.photo[imageCtx.msg.photo.length - 1].file_id;

  await ctx.reply(
    "Напишите номер вашего телефона, чтобы мы могли связаться с вами"
  );
  const userPhoneNumber = await conversation.wait();

  const orderInfo = { url, image, quantityAndSize, userPhoneNumber };

  await returnOrderDataToUserForVerification(ctx, orderInfo);

  const orderStartus = await conversation.wait();

  if (orderStartus.msg.text == "Да, все правильно!") {
    await ctx.reply("Спасибо, скоро начнем обрабатывать заказ", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  } else if (
    orderStartus.msg.text == "Нет, тут ошибка, я хочу исправить данные"
  ) {
    await ctx.reply("Давайте исправим", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    return await singleOrder(conversation, ctx);
  }

  await sendOrderMessageToAdmin(ctx, orderInfo);
  //await sendOrderInfoToServer(orderInfo);
}

module.exports = { singleOrder }; //экспорт в "./src/middleware/middleware"
