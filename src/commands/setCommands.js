async function setCommands(bot) {
  bot.api.setMyCommands([
    {
      command: "menu",
      description: "Меню",
    },
  ]);
}

module.exports = { setCommands };
