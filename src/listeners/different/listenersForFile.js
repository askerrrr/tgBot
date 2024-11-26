const { env } = require("../../../env");

module.exports.getFileId = async (bot) => {
  bot.on("message:photo", async (ctx) => {
    const photo = await ctx.message.photo;
    const fileId = photo[photo.length - 1].file_id;
    const fileLink = await ctx.api.getFile(fileId);
    const filePath = fileLink.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${env.bot_token}/${filePath}`;
    await ctx.reply(`${fileUrl}`);
  });
};
