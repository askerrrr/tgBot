async function installMenu(bot) {
  bot.api.setMyCommands([
    {
      command: "menu",
      description: "Меню",
    },
  ]);
}

module.exports = { installMenu };
