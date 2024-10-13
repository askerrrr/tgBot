async function installMenu(bot) {
  bot.api.setMyCommands([
    {
      command: "menu",
      description: "Меню",
    },
    {
      command: "faq",
      description: "Часто задаваемые вопросы",
    },
  ]);
}

module.exports = { installMenu };
