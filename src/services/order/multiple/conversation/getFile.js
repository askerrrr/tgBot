var { getFileUrl } = require("../../services/getFileURL");

module.exports.getFile = async (ctx, conversation) => {
  try {
    await ctx.reply(
      `Пришлите эксель таблицу с вашими товарами\n\nПолучить шаблон можно в разделе -  /Другое/Получить шаблон`,
      {
        reply_markup: { remove_keyboard: true },
      }
    );

    var { message } = await conversation.wait();

    if (!message.hasOwnProperty("document")) {
      await ctx.reply("Это вообще не документ...");

      return;
    }

    var fileId = message.document.file_id;

    var fileUrl = await getFileUrl(ctx, fileId);

    var fileExtension = fileUrl.split(".")[3];

    var validFile = fileExtension.toLowerCase() === "xlsx";

    if (!validFile) {
      await ctx.reply("Это не эксель таблица, попробуйте еще раз");

      return;
    }

    return `${fileUrl}::${fileId}`;
  } catch (err) {
    console.log(err);
  }
};
