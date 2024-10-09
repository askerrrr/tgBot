const { env } = require("../../../env");

async function getFileUrl(ctx, fileId) {
  try {
    const fileLink = await ctx.api.getFile(fileId);
    const filePath = fileLink.file_path;
    const fileURL = `https://api.telegram.org/file/bot${env.bot_token}/${filePath}`;
    return fileURL;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getFileUrl };
