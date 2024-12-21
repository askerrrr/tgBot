var { wrapURL } = require("../../services/wrapURL");
var {
  checkDescriptionStructure,
} = require("../../services/checkDescriptionStructure");
var { keyboardForСheckingnOrder } = require("../../../../keyboard/keyboard");

module.exports.returnOrderToUser = async (
  ctx,
  url,
  phone,
  imageId,
  description
) => {
  url = wrapURL(url);
  description = checkDescriptionStructure(description);

  await ctx.reply(`${description}\nТелефон: ${phone}\nСсылка: ${url}`, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

  await ctx.replyWithPhoto(imageId);
  await ctx.reply(`Все правильно?`, {
    reply_markup: keyboardForСheckingnOrder,
  });
};
