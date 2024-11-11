const { checkFileExtension } = require("../services/checkFileExtension");

module.exports.getImage = async (ctx, conversation) => {
  try {
    await ctx.reply("Отправьте фото товара");

    const imageCtx = await conversation.wait();

    const imageId = imageCtx.msg.photo[imageCtx.msg.photo.length - 1].file_id;

    const validFileExtension = await checkFileExtension(fileUrl);

    if (!validFileExtension) return;

    return imageId;
  } catch (err) {
    console.log(err);
  }
};
