const { env } = require("../../../../env");

module.exports.getFileUrl = async (ctx, fileId) => {
  try {
    const fileLink = await ctx.api.getFile(fileId);
    const filePath = fileLink.file_path;
    const fileURL = `https://api.telegram.org/file/bot${env.bot_token}/${filePath}`;
    return fileURL;
  } catch (err) {
    console.log(err);
  }
};
