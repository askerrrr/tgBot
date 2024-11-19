const { getFileUrl } = require("../../../different/getFileURL");

module.exports.getFile = async function (ctx, conversation) {
  try {
    await ctx.reply(
      `Пришлите эксель таблицу с вашими товарами\n\nПолучить шаблон можно в разделе -  /Другое/Получить шаблон`,
      {
        reply_markup: { remove_keyboard: true },
      }
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
};
