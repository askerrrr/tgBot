const { checkUrl } = require("../services/checkUrl");

exports.getUrl = async (ctx, conversation) => {
  try {
    await ctx.reply("Пришлите ссылку на товар", {
      reply_markup: { remove_keyboard: true },
    });

    const urlCtx = await conversation.wait();

    const url = urlCtx.msg.text;

    const validUrl = await checkUrl(url);

    if (!validUrl) {
      await ctx.reply("Какая-то неправильная ссылка");
      return;
    }

    return validUrl;
  } catch (err) {
    console.log(err);
  }
};
