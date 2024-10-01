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
  .text("Получить свой id")
  .row()
  .text("Получить шаблон")
  .row()
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

const keyboardForAppGuides = new Keyboard()
  .text("Гайд по 1688")
  .text("Гайд по Taobao")
  .row()
  .text("Гайд по Ponzon")
  .text("Гайд по Pinduoduo")
  .row("Основное меню")
  .resized();

const keyboardForСheckingnOrder = new Keyboard()
  .text("Да, все правильно!")
  .row()
  .text("Нет, тут ошибка, я хочу исправить данные")
  .resized();

module.exports = {
  keyboardForAppGuides,
  keyboardForСheckingnOrder,
  keyboardForTheMainMenu,
  keyboardForOtherQueries,
  keyboardForDownloadingApp,
};
