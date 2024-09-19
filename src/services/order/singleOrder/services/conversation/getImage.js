module.exports.getImage = async (ctx, conversation) => {
  await ctx.reply("Отправьте фото товара");

  const imageCtx = await conversation.wait();
  const image = imageCtx.msg.photo[imageCtx.msg.photo.length - 1].file_id;
  return image;
};
