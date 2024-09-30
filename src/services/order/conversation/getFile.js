async function getFile(ctx, conversation) {
  try {
    await ctx.reply(
      "Пришлите ссылку на таблицу с вашими товарами\n\n(получить ссылку на файл можно в разделе -  /Другое/Получить шаблон)"
    );

    const { message } = await conversation.wait();
    const fileURL = message.text;

    if (!fileURL.startsWith("https://docs.google")) {
      await ctx.reply("Это не ссылка на Google Docs. Попробуйте еще раз.");

      return await getFile(conversation, ctx);
    }

    return fileURL;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getFile };
