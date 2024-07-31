const { keyboardForSingleOrder } = require("../../keyboard/keyboard");
const { checkStrLength } = require("./checkStrLength");
const { orderMessageToAdmit } = require("./messageToAdmin");

async function singleOrder(conversation, ctx) {
  await ctx.reply("Пришлите ссылку на товар");
  const urlCtx = await conversation.wait();
  const url = urlCtx.msg.text;

  await ctx.reply(
    "Теперь пришлите нам количество товара и размер ( в случае если это одежда ). Если это товар не из категории одежды, тогда просто количество"
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

  await ctx.reply(`Ссылка : ${url}`, {
    disable_web_page_preview: true,
  }); // возвращение ссылки
  await checkStrLength(quantityAndSize, ctx); //возвращение количества товара и проверка ответа на наличие или отсутствие размера
  await ctx.replyWithPhoto(`${image}`); // возвращение фото
  await ctx.reply(`Ваш номер телефона : ${userPhoneNumber.msg.text}`); // возвращение номера телефона

  await ctx.reply("Все правильно?", {
    reply_markup: keyboardForSingleOrder,
  });

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

  module.exports = { url, image, userPhoneNumber, quantityAndSize };

  await orderMessageToAdmit(ctx, url, image, quantityAndSize, userPhoneNumber) // отправляем заказ админу в лс;
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
