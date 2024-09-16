const { env } = require("../../../env");

async function getFileUrl(ctx, file) {
  const fileLink = await ctx.api.getFile(file);
  const filePath = fileLink.file_path;
  const fileURL = `https://api.telegram.org/file/bot${env.bot_token}/${filePath}`;
  await ctx.reply(`${fileURL}`);
  return fileURL;
}

module.exports = { getFileUrl };
