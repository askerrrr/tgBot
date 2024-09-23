module.exports.getFile = async (ctx, conversation) => {
  try {
    await ctx.reply("Пришлите документ с вашими товарами");

    const { message } = await conversation.waitFor("message:document");
    const fileId = message.document.file_id;

    return fileId;
  } catch (err) {
    console.log(err);
  }
};
