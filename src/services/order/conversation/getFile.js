const { checkSpreadSheets } = require("../../different/checkSpreadSheets");

async function getFile(ctx, conversation) {
  try {
    await ctx.reply(
      "Пришлите ссылку на таблицу с вашими товарами\n\n(получить ссылку на файл можно в разделе -  /Другое/Получить шаблон)"
    );

    const { message } = await conversation.wait();
    const fileURL = message.text;

    const result = checkSpreadSheets(fileURL);

    if (!result) {
      await ctx.reply("Это не ссылка на Гугл таблицу. Попробуйте еще раз.");

      return null;
    }

    return fileURL;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getFile };
