module.exports.getDescriprion = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Теперь пришлите нам через пробел \n\n1)Количество товара \n2)Размер (если такой параметр имеется)"
    );
    const desctiptionCtx = await conversation.wait();

    const desctiption = String(desctiptionCtx.msg.text).split(" ");

    return desctiption;
  } catch (err) {
    console.log(err);
  }
};
