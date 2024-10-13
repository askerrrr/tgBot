const { keyboardForTheMainMenu } = require("../keyboard/keyboard");

async function mainMenu(ctx) {
  await ctx.reply("Меню", {
    reply_markup: keyboardForTheMainMenu,
  });
}

module.exports = { mainMenu };
