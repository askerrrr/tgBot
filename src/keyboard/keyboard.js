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

  .text("Личный кабинет")
  .row()
  .text("Получить шаблон")
  .text("Скачать приложения")
  .row()
  .text("Основное меню")
  .resized();

const keyboardForPersonalAccount = new Keyboard()
  .text("Активные заказы")
  .row()
  .text("Завершенные заказы")
  .row()
  .text("Мои данные")
  .text("Статус заказа")
  .row()
  .text("Назад")
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
  .row()
  .text("Основное меню")
  .resized();

const keyboardForСheckingnOrder = new Keyboard()
  .text("Да, все правильно!")
  .row()
  .text("Нет, тут ошибка, я хочу исправить данные")
  .resized();

const keyboardForFAQ = new Keyboard()
  .text("Доставка")
  .row()
  .text("Маркеплейсы с которыми работаем")
  .row()
  .text("Основное меню")
  .resized();

const keyboardForDelivery = new Keyboard()
  .text("Адрес доставки")
  .text("Стоимость доставки")
  .row()
  .text("Сроки доставки")
  .row()
  .text("Назад к вопросам")
  .resized();

module.exports = {
  keyboardForFAQ,
  keyboardForDelivery,
  keyboardForAppGuides,
  keyboardForTheMainMenu,
  keyboardForOtherQueries,
  keyboardForСheckingnOrder,
  keyboardForDownloadingApp,
  keyboardForPersonalAccount,
};
