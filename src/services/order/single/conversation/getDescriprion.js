var { checkDescription } = require("../../services/checkDescription");

module.exports.getDescriprion = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Теперь пришлите нам через пробел \n\n1)Количество товара \n2)Размер (если такой параметр имеется)"
    );
    var desctiptionCtx = await conversation.wait();

    var desctiption = String(desctiptionCtx.msg.text).split(" ");

    var result = await checkDescription(desctiption);

    if (!result) {
      await ctx.reply("Попробуйте еще раз");
      return;
    }

    return {
      qty: desctiption[0],
      size: desctiption[1] || "",
    };
  } catch (err) {
    console.log(err);
  }
};
