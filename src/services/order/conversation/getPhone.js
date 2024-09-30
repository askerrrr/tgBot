async function getPhone(ctx, conversation) {
  try {
    await ctx.reply("А теперь напишите номер вашего телефона");

    let userPhoneNumber = await conversation.wait();

    await ctx.reply("Напишите номер вашего телефона");
    const message = await conversation.wait();
    const phone = message.msg.text;

    if (!Number(phone)) {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");
      return await getPhone(ctx, conversation);
    }
    return userPhoneNumber.msg.text;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPhone };
