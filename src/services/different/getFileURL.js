const { env } = require("../../../env");

async function getFileUrl(ctx, file) {
  const fileLink = await ctx.api.getFile(file);
  const filePath = fileLink.file_path;
  const fileURL = `https://api.telegram.org/file/bot${env.bot_token}/${filePath}`;
  const response = await fetch(fileURL);
  if (!response.ok) {
    throw new Error(`Ошибка получения файла: ${response.statusText}`);
  }

  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}

module.exports = { getFileUrl };
