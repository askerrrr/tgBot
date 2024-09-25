const messageForNonReadyFunctions = "Мы над этим работаем...";

//Часто задаваемые вопросы FAQ//
const FAQText = `<b>Ответы на часто задаваемые вопросы</b>\n\n<u>С каких сайтов вы выкупаете?</u>\nМы выкупаем с таких сайтов как:\n\n-1688\n-Taobao\n-Poizon\n-Pinduoduo\n\n\n\Скачать приложения этих сайтов:
\nМеню => Другое => Скачать приложения\n\n\n<u>В течении какого времени товар приедет в Москву?</u>\n\nДоставка из Китая в Москву осуществляется в течении 10-20 дней\n\n\nМогу ли я заказать одни товар?\nДа, но в этом случае доставка будет рассчитываться `;

//Ссылки для скачивания приложения 1688
const linkForApp1688 =
  '<u><a href="https://apps.apple.com/ru/app/阿里巴巴-1688-货源批发采购进货市场/id507097717" target="_blank">Скачать приложение на айфон</a>\n\n\n<a href="https://play.google.com/store/apps/details?id=com.taobao.taobao" target="_blank">Скачать приложение на андроид</a></u>';

//Ссылки для скачивания приложения Taobao
const linkForAppTaobao =
  '<u><a href="https://apps.apple.com/ru/app/淘宝-太好逛了吧/id387682726" target="_blank">Скачать приложение на айфон</a>\n\n\n<a href="https://play.google.com/store/apps/details?id=com.taobao.taobao" target="_blank">Скачать приложение на андроид</a></u>';

//Ссылки для скачивания приложения Poizon
const linkForAppPoizon =
  '<u><a href="https://apps.apple.com/ru/app/得物-得到运动x潮流x好物/id1012871328 target="_blank">Скачать приложение на айфон</a>\n\n\n<a href="" target="_blank">Скачать приложение на андроид</a></u>';

//Ссылки для скачивания приложения Pinduoduo
const linkForAppPinduoduo =
  '<u><a href="" target="_blank">Скачать приложение на айфон</a>\n\n\n<a href="" target="_blank">Скачать приложение на андроид</a></u>';

//Текст для необработанных сообщений
const unexpectedMessages = "Не понимаю вас, пожалуйста, воспользуйтесь меню ☰";

module.exports = {
  messageForNonReadyFunctions,
  FAQText,
  linkForApp1688,
  linkForAppTaobao,
  linkForAppPoizon,
  templateDocument,
  linkForAppPinduoduo,
  unexpectedMessages,
};
