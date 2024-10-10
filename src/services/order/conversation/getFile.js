const { getFileUrl } = require("../../different/getFileURL");

async function getFile(ctx, conversation) {
  try {
    await ctx.reply(
      "Пришлите эксель таблицу с вашими товарами\n\n(получить файл можно в разделе -  /Другое/Получить шаблон)"
    );

    const { message } = await conversation.wait();

    if (!message.hasOwnProperty("document")) {
      await ctx.reply("Это вообще не документ...");
      return null;
    } else {
      const fileId = message.document.file_id;

      const fileUrl = await getFileUrl(ctx, fileId);

      const validFile = fileUrl.split(".").reverse()[0] === "xlsx";

      if (!validFile) {
        await ctx.reply("Это не эксель таблица, попробуйте еще раз");
        return null;
      }

      return fileUrl;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getFile };
