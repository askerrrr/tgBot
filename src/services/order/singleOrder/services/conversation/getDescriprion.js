module.exports.getDescriprion = async (ctx, conversation) => {
  await ctx.reply(
    "Теперь пришлите нам через пробел \n\n1)Количество товара \n2)Размер (если такой параметр имеется)"
  );
  const quantityAndSizeCtx = await conversation.wait();
  const quantityAndSize = String(quantityAndSizeCtx.msg.text)
  return quantityAndSize;
};
