const { Bot, GrammyError, HttpError, Keyboard } = require("grammy");
require("dotenv").config();
const { getCNY, getDate } = require("./valute");
const commands = require("./commands");
const {
  botText,
  frequentlyAskedQuestions,
  textFor1688,
  unprocessedMessages,
} = require("./text");
const bot = new Bot(process.env.BOT_TOKEN);

bot.hears("/start", async (ctx) => {
  await ctx.reply(
    `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен ID-${ctx.chat.id}, в дальнейшем этот ID будет соответствовать номеру вашего заказа\nДля дальнейшей работы воспользуйтесь 'Меню' `
  );
});

bot.api.setMyCommands(commands);

const KeyboardForTheMainMenu = new Keyboard()
  .text("Сделать заказ!")
  .text("Как сделать заказ?")
  .row()
  .text("Рассчитать стоимость заказа")
  .text("Другое")
  .row()
  .text("Часто задаваемые вопросы FAQ")
  .resized();

// Блок Основного меню =>

bot.hears("/menu", async (ctx) => {
  await ctx.reply("Меню", {
    reply_markup: KeyboardForTheMainMenu,
  });
});

bot.hears("Сделать заказ!", async (ctx) => {
  await ctx.reply(
    "Отправьте нам ссылку на товар, фотографию самого товара, размер(если это одежда или обувь) и количество"
  );
});
bot.hears("Как сделать заказ?", async (ctx) => {
  await ctx.reply(botText);
});
bot.hears("Рассчитать стоимость заказа", async (ctx) => {
  try {
    const valute = await getCNY();

    await ctx.reply(
      `Курс на ${getDate()} ${valute.Valute.CNY.Value + 1.5} рублей за 1 юань`
    );
  } catch (err) {
    console.log(err);
  }
});
bot.hears("Часто задаваемые вопросы FAQ", async (ctx) => {
  await ctx.reply(frequentlyAskedQuestions, {
    parse_mode: "HTML",
  });
});

bot.hears("Другое", async (ctx) => {
  await ctx.reply("Другое", {
    reply_markup: keyboardForOtherQueries,
  });
});
//  <= Блок Основного меню

//  Блок раздера "Другое" =>

const keyboardForOtherQueries = new Keyboard()
  .text("Скачать приложения")
  .row()
  .text("Основное меню")
  .resized();

bot.hears("Основное меню", async (ctx) => {
  await ctx.reply("Меню", {
    reply_markup: KeyboardForTheMainMenu,
  });
});

//  <= Блок раздела "Другое"

// Блок выбора приложений из раздела "Другое/Скачать приложения" =>
const keyboardForDownloadingApp = new Keyboard()
  .text("1688")
  .text("Taobao")
  .row()
  .text("Poizon")
  .text("Pinduoduo")
  .row()
  .text("Назад")
  .resized();

bot.hears("Скачать приложения", async (ctx) => {
  await ctx.reply("Выберите приложения", {
    reply_markup: keyboardForDownloadingApp,
  });
});

bot.hears("Назад", async (ctx) => {
  await ctx.reply("Другое", {
    reply_markup: keyboardForOtherQueries,
  });
});
//  <= Блок выбора приложений из раздела "Другое/Скачать приложения"

// Блок управление приложениями =>
const keyboardForDeviceSelection = new Keyboard()
  .text("Для айфона")
  .text("Для андроида")
  .row()
  .text("К приложениям")
  .resized();

bot.hears("1688", async (ctx) => {
  await ctx.reply(textFor1688, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
});

bot.hears("К приложениям", async (ctx) => {
  await ctx.reply("Выберите приложения", {
    reply_markup: keyboardForDownloadingApp,
  });
});

bot.on("::url", async (ctx) => {
  await ctx.reply("мммм... ссылочка...", {
    parse_mode: "HTML",
  });
});

bot.on("message", async (ctx) => {
  await ctx.reply(unprocessedMessages);
});

//Обработка ошибок
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
