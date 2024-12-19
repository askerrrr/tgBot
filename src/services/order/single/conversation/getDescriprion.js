var { checkDescription } = require("../../services/checkDescription");

module.exports.getDescriprion = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Теперь пришлите нам через пробел \n\n1)Количество товара \n2)Размер (если такой параметр имеется)"
    );

    var description = await conversation.wait();

    var [qty, size] = description.msg.text.split(" ");

    var validDesc = await checkDescription(+qty, +size || "");

    if (!validDesc) {
      await ctx.reply("Попробуйте еще раз");
      return;
    }

    return validDesc;
  } catch (err) {
    console.log(err);
  }
};
