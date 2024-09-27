module.exports.getFile = async (ctx, conversation) => {
  try {
    await ctx.reply("Пришлите ссылку на таблицу с вашими товарами");

    const { message } = await conversation.wait();
    const fileURL = message;

    return fileURL;
  } catch (err) {
    console.log(err);
  }
};
