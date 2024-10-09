const { getFileUrl } = require("../../different/getFileURL");

async function getFile(ctx, conversation) {
  try {
    await ctx.reply(
      "Пришлите ссылку на таблицу с вашими товарами\n\n(получить ссылку на файл можно в разделе -  /Другое/Получить шаблон)"
    );

    const { message } = await conversation.wait();
    const fileId = message.document.file_id;

    const fileUrl = await getFileUrl(ctx, fileId);
   
    return fileUrl;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getFile };
