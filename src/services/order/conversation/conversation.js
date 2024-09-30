async function conv(ctx, conversation) {
  try {
    await ctx.reply(
      "Пришлите ссылку на таблицу с вашими товарами\n\n(получить ссылку на файл можно в разделе -  /Другое/Получить шаблон)"
    );

    const { message } = await conversation.wait();
    const fileURL = message.text;

    const order = [];

    if (!fileURL.startsWith("https://docs.google")) {
      await ctx.reply(
        "Пришлите ссылку на таблицу с вашими товарами\n\n(получить ссылку на файл можно в разделе -  /Другое/Получить шаблон)"
      );
    } else {
      order.push(fileURL);

      await ctx.reply("Напишите номер вашего телефона");
      const message = await conversation.wait();
      const phone = message.msg.text;

      if (!Number(phone)) {
        await ctx.reply("Напишите номер вашего телефона");
      } else {
        order.push(phone);
        return order;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { conv };
