async function getPhone(ctx, conversation) {
  try {
    await ctx.reply("Напишите номер вашего телефона");

    const message = await conversation.wait();
    const phone = message.msg.text;

    if (!Number(phone)) {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return null;
    }

    return userPhoneNumber.msg.text;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPhone };
