const {
  sendOrderMessageToAdmin,
} = require("./services/sendOrderMessageToAdmin");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function singleOrder(conversation, ctx) {
  await ctx.reply("Пришлите ссылку на товар");
  const urlCtx = await conversation.wait();
  const url = urlCtx.msg.text;

  await ctx.reply(
    "Теперь пришлите нам количество товара и размер\n(  в случае если такой параметр есть )\nЕсли это товар не из категории одежды, тогда просто количество"
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

  await returnOrderDataToUser(
    url,
    quantityAndSize,
    ctx,
    image,
    userPhoneNumber
  );

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

  await sendOrderMessageToAdmin(
    ctx,
    url,
    image,
    quantityAndSize,
    userPhoneNumber
  );
  module.exports = { url, image, userPhoneNumber, quantityAndSize };
}

module.exports = { singleOrder }; //экспорт в "./src/middleware/middleware"

// const response = await fetch("/telegramuser/order", {
//   method: "POST",
//   body: JSON.stringify({
//     url,
//     quantityAndSizeStr,
//     image,
//   }),
//   headers: { Accept: "application/json", "Content-Type": "application/json" },
// });
// const order = response.json();
// return order;
