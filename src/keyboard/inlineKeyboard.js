const { InlineKeyboard } = require("grammy");

const inlineKeyboardForFAQ = new InlineKeyboard()
  .text("С каких сайтов вы выкупаете?", "shoppingSites")
  .row()
  .text("Куда доставляете товар?", "deliveryAddress")
  .row()
  .text("Что по срокам доставки?", "deliveryTime")
  .row()
  .text("Сколько вы берете за свои услуги?", "costOfServices");

module.exports = { inlineKeyboardForFAQ };
