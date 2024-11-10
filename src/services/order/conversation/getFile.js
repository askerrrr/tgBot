const { getFileUrl } = require("../../different/getFileURL");

async function getFile(ctx, conversation) {
  try {
    await ctx.reply(
      "Пришлите эксель таблицу с вашими товарами\n\n(получить шаблон можно в разделе -  /Другое/Получить шаблон)"
    );

    const { message } = await conversation.wait();

    if (!message.hasOwnProperty("document")) {
      await ctx.reply("Это вообще не документ...");
      return;
    } else {
      const fileId = message.document.file_id;

      const fileUrl = await getFileUrl(ctx, fileId);

      const fileExtension = fileUrl.split(".")[3];

      const validFile = fileExtension.toLowerCase() === "xlsx";

      if (!validFile) {
        await ctx.reply("Это не эксель таблица, попробуйте еще раз");
        return;
      }

      return `${fileUrl}::${fileId}`;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getFile };
