module.exports.checkStrLength = async (str, ctx) => {
  if (str.length === 1) {
    await ctx.reply(`кол-во: ${str[0]}`);
  } else if (str.length === 2) {
    await ctx.reply(`кол-во: ${str[0]}\nРазмер : ${str[1]}`);
  }
};
