const { Bot, GrammyError, HttpError, Keyboard } = require("grammy");
require("dotenv").config();
const { getCNY, getDate } = require("./valute");
const commands = require("./commands");
const { botText, frequentQuestions } = require("./text");
const bot = new Bot(process.env.BOT_TOKEN);

//

//

//

bot.hears("/start", async (ctx) => {
  await ctx.reply(
    `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен ID-${ctx.chat.id}, в дальнейшем этот ID будет соответствовать номеру вашего заказа\nДля дальнейшей работы воспользуйтесь 'Меню' `
  );
});

bot.api.setMyCommands(commands);

const KeyboardForTheMainMenu = new Keyboard()
  .text("Сделать заказ!")
  .row()
  .text("Как сделать заказ?")
  .row()
  .text("Какой курс юаня сегодня?")
  .row()
  .text("У меня вопросы")
  .row()
  .text("Другое")
  .resized();

bot.hears("/menu", async (ctx) => {
  await ctx.reply("Меню", {
    reply_markup: KeyboardForTheMainMenu,
  });
});
//
bot.hears("Сделать заказ!", async (ctx) => {
  await ctx.reply(
    "Отправьте нам ссылку на товар, фотографию самого товара, размер(если это одежда или обувь) и количество"
  );
});
bot.hears("Как сделать заказ?", async (ctx) => {
  await ctx.reply(botText);
});
bot.hears("Какой курс юаня сегодня?", async (ctx) => {
  try {
    const valute = await getCNY();

    await ctx.reply(
      `Курс на ${getDate()} ${valute.Valute.CNY.Value + 1.5} рублей за 1 юань`
    );
  } catch (err) {
    console.log(err);
  }
});
bot.hears("У меня вопросы", async (ctx) => {
  await ctx.reply(frequentQuestions, {
    parse_mode: "HTML",
  });
});

const keyboardForDownloadingApp = new Keyboard()
  .text("1688")
  .text("Taobao")
  .resized();

bot.hears("Другое", async (ctx) => {
  await ctx.reply("Другое", {
    reply_markup: keyboardForDownloadingApp,
  });
});

bot.on("::url", async (ctx) => {
  await ctx.reply("мммм... ссылочка...", {
    parse_mode: "HTML",
  });
});

bot.on("message", async (ctx) => {
  await ctx.reply("Не понимаю...");
});

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
