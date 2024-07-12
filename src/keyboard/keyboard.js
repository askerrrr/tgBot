const { Keyboard } = require("grammy");

const keyboardForTheMainMenu = new Keyboard()
  .text("Сделать заказ!")
  .text("Как сделать заказ?")
  .row()
  .text("Рассчитать стоимость заказа")
  .text("Другое")
  .row()
  .text("Часто задаваемые вопросы FAQ")
  .resized();

const keyboardForOtherQueries = new Keyboard()
  .text("Скачать приложения")
  .row()
  .text("Основное меню")
  .resized();

const keyboardForDownloadingApp = new Keyboard()
  .text("1688")
  .text("Taobao")
  .row()
  .text("Poizon")
  .text("Pinduoduo")
  .row()
  .text("Назад")
  .resized();

module.exports = {
  keyboardForTheMainMenu,
  keyboardForOtherQueries,
  keyboardForDownloadingApp,
};
