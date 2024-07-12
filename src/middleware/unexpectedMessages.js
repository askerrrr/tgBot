const { unexpectedMessages } = require("../utils/text");

function catchUnexpectedMessages(bot) {
  bot.on("message", async (ctx) => {
    await ctx.reply(unexpectedMessages, {
      parse_mode: "HTML",
    });
  });
}

module.exports = { catchUnexpectedMessages };
