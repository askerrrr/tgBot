const { textForOneOrder } = require("../../utils/text");

async function singleOrder(conversation, ctx) {
  await ctx.reply("Пришлите ссылку на товар");
  const urlCtx = await conversation.wait();
  const url = urlCtx.msg.text;

  await ctx.reply(
    "Теперь пришлите нам количество товара и размер ( в случае если это одежда ). Если это товар не из категории одежды, тогда просто количество"
  );
  const quantityAndSizeCtx = await conversation.wait();
  const quantityAndSize = quantityAndSizeCtx.msg.text;
  let quantityAndSizeLength = quantityAndSize
    .split(" ")
    .map((item, index) => `${index + 1} : ${item}\n`);

  await ctx.reply("Отправьте фото товара");

  const imageCtx = await conversation.wait();
  const image = imageCtx.msg.photo[imageCtx.msg.photo.length - 1].file_id;

  await ctx.reply(`Ссылка : ${url}`, {
    disable_web_page_preview: true,
  });
  await ctx.reply(`${quantityAndSizeLength}`);

  await ctx.replyWithPhoto(`${image}`);
}

module.exports = { singleOrder };
