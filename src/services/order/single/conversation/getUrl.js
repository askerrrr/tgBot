module.exports.getUrl = async (ctx, conversation) => {
  try {
    await ctx.reply("Пришлите ссылку на товар");

    const urlCtx = await conversation.wait();

    return urlCtx.msg.text;
  } catch (err) {
    console.log(err);
  }
};
