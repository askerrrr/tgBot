async function getFileId(bot) {
  bot.on("message:video", async (ctx) => {
    const fileId = ctx.message.video.file_id;
    await ctx.reply(`${fileId}`);
  });
}

module.exports = { getFileId };
