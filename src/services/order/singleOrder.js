const { keyboardForSingleOrder } = require("../../keyboard/keyboard");

async function singleOrder(conversation, ctx) {
  await ctx.reply("Пришлите ссылку на товар");
  const urlCtx = await conversation.wait();
  const url = urlCtx.msg.text;

  await ctx.reply(
    "Теперь пришлите нам количество товара и размер ( в случае если это одежда ). Если это товар не из категории одежды, тогда просто количество"
  );
  const quantityAndSizeCtx = await conversation.wait();
  const quantityAndSize = quantityAndSizeCtx.msg.text;
  let quantityAndSizeStr = quantityAndSize.split(" ");

  await ctx.reply("Отправьте фото товара");

  const imageCtx = await conversation.wait();
  const image = imageCtx.msg.photo[imageCtx.msg.photo.length - 1].file_id;

  await ctx.reply(`Ссылка : ${url}`, {
    disable_web_page_preview: true,
  });
  await ctx.reply(
    `Размер :${quantityAndSizeStr[0]}\nкол-во: ${quantityAndSizeStr[1]}`
  );
  await ctx.replyWithPhoto(`${image}`);

  await ctx.reply("Спасибо, скоро начнем обрабатывать заказ");
  // await ctx.reply("Все правильно?", {
  //   reply_markup: keyboardForSingleOrder,
  // });

  // const orderStartus = await conversation.wait();
  // if (orderStartus == "Да, все правильно!") {
  //   return await ctx.reply("Спасибо, скоро начнем обрабатывать заказ");
  // } else if (orderStartus == "Нет, тут ошибка, я хочу исправить данные") {
  //   return await singleOrder(conversation, ctx);
  // }
}

module.exports = { singleOrder };
