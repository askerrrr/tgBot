const { Bot, GrammyError, HttpError, Keyboard } = require("grammy");
require("dotenv").config();
const { getCNY, getDate } = require("./valute");
const commands = require("./commands");

const bot = new Bot(process.env.BOT_TOKEN);

//

bot.api.setMyCommands(commands);
//
const keyboard = new Keyboard()
  .text("Сделать заказ!")
  .row()
  .text("Как сделать заказ?")
  .row()
  .text("Какой курс юаня сегодня?")
  .row()
  .text("Часто задаваемые вопросы")
  .resized();
//
bot.hears("/start", async (ctx) => {
  await ctx.reply(
    `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен ID-${ctx.chat.id}, в дальнейшем этот ID будет соответствовать номеру вашего заказа\nДля дальнейшей работы воспользуйтесь 'Меню' `
  );
});
//
bot.hears("/menu", async (ctx) => {
  await ctx.reply("Меню", {
    reply_markup: keyboard,
  });
});
//
bot.hears("Как сделать заказ?", async (ctx) => {
  await ctx.reply("Отправьте нам");
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
