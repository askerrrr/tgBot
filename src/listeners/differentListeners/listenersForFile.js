async function getFileId(bot) {
  bot.on("message:document", async (ctx) => {
    const fileId = ctx.message.document.file_id;
    await ctx.reply(`${fileId}`);
  });
}

module.exports = { getFileId };
