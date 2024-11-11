const { checkFileExtension } = require("../services/checkFileExtension");

module.exports.getImage = async (ctx, conversation) => {
  try {
    await ctx.reply("Отправьте фото товара");

    const imageCtx = await conversation.wait();

    const imageId = imageCtx.msg.photo[imageCtx.msg.photo.length - 1].file_id;

    const validFile = await checkFileExtension(fileUrl);

    if (!validFile) {
      await ctx.reply("Что то не похоже на фото, попробуйте еще раз");
      return;
    }

    return validFile;
  } catch (err) {
    console.log(err);
  }
};
