module.exports.getFile = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Пришлите ссылку на таблицу с вашими товарами\n\n(получить ссылку на файл можно в разделе -  /Другое/Получить шаблон)"
    );

    const { message } = await conversation.wait();
    const fileURL = message.text;

    return fileURL;
  } catch (err) {
    console.log(err);
  }
};
