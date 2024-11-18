const { checkDescription } = require("../services/checkDescription");

module.exports.getDescriprion = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Теперь пришлите нам через пробел \n\n1)Количество товара \n2)Размер (если такой параметр имеется)"
    );
    const desctiptionCtx = await conversation.wait();

    const desctiption = String(desctiptionCtx.msg.text).split(" ");

    const result = await checkDescription(desctiption);

    if (!result) {
      await ctx.reply("Попробуйте еще раз");
      return;
    }

    return {
      quantity: desctiption[0],
      size: desctiption[1] || "",
    };
  } catch (err) {
    console.log(err);
  }
};
