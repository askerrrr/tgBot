var { checkFileExtension } = require("../../services/checkFileExtension");

module.exports.getImage = async (ctx, conversation) => {
  try {
    await ctx.reply("Отправьте фото товара");

    var imageCtx = await conversation.wait();

    if (!imageCtx.msg.photo) {
      await ctx.reply("Что то не похоже на фото, попробуйте еще раз");
      return;
    }

    var imageId =
      imageCtx.msg.photo[imageCtx.msg.photo.length - 1].file_id ||
      imageCtx.msg.photo.file_id;

    var validFile = await checkFileExtension(ctx, imageId);

    if (!validFile) {
      await ctx.reply(
        "Что то не похоже на ожидаемый формат фото, попробуйте еще раз"
      );
      return;
    }

    return validFile;
  } catch (err) {
    console.log(err);
  }
};
