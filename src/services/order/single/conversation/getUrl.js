const { checkUrl } = require("../services/checkUrl");

module.exports.getUrl = async (ctx, conversation) => {
  try {
    await ctx.reply("Пришлите ссылку на товар");

    const urlCtx = await conversation.wait();

    const url = urlCtx.msg.text;

    const validUrl = checkUrl(url);

    if (!validUrl) {
      await ctx.reply("Попробуйте еще раз");
      return;
    }
    return validUrl;
  } catch (err) {
    console.log(err);
  }
};
