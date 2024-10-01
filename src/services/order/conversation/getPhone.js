async function getPhone(ctx, conversation) {
  try {
    await ctx.reply("Напишите номер вашего телефона");

    const message = await conversation.wait();
    const phone = Number(message.msg.text);

    if (!phone) {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return null;
    } else if (String(phone).length <= 10) {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return null;
    } else if (String(phone).length >= 12) {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return null;
    }
    return phone;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPhone };
