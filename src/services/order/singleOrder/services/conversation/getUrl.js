module.exports.getUrl = async (ctx, conversation) => {
  try {
    await ctx.reply("Пришлите ссылку на товар");
    const urlCtx = await conversation.wait();
    const url = urlCtx.msg.text;
    return url;
  } catch (err) {
    console.log(err);
  }
};
