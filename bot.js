const {
  Bot,
  session,
  Context,
  GrammyError,
  HttpError,
  Keyboard,
  MemorySessionStorage,
  InputFile,
} = require("grammy");

const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");

const { chatMembers } = require("@grammyjs/chat-members");

const {
  botText,
  FAQ,
  linkForApp1688,
  linkForAppTaobao,
  linkForAppPoizon,
  linkForAppPinduoduo,
  unprocessedMessages,
} = require("./text");

require("dotenv").config();

const { getCNY, getDate } = require("./currencyExtraction");

const commands = require("./commands");

const bot = new Bot(process.env.BOT_TOKEN);

//
//
//

const adapter = new MemorySessionStorage();
bot.use(chatMembers(adapter));

bot.hears("/start", async (ctx) => {
  const chatMember = await ctx.chatMembers.getChatMember();
  const arrayOfUsers = [];
  arrayOfUsers.push(chatMember.user);
  console.log(arrayOfUsers);
  //console.log(chatMember.user);
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
  await ctx.reply(FAQ, {
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

// Блок, в котором предлагают скачать приложение под IOS или Андроид, тут используется плагин "@grammyjs/conversations", для каждого приложения написана своя функция, мне показалось, что так будет лучше смореться  =>

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(showLinksFor1688));
bot.use(createConversation(showLinksForTaobao));
bot.use(createConversation(showLinksForPoizon));
bot.use(createConversation(showLinksForPinduoduo));

async function showLinksFor1688(conversation, ctx) {
  await ctx.reply(linkForApp1688, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

async function showLinksForTaobao(conversation, ctx) {
  await ctx.reply(linkForAppTaobao, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

async function showLinksForPoizon(conversation, ctx) {
  await ctx.reply(linkForAppPoizon, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

async function showLinksForPinduoduo(conversation, ctx) {
  await ctx.reply(linkForAppPinduoduo, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}
bot.hears("1688", async (ctx) => {
  await ctx.conversation.enter("showLinksFor1688");
});

bot.hears("Taobao", async (ctx) => {
  await ctx.conversation.enter("showLinksForTaobao");
});

bot.hears("Poizon", async (ctx) => {
  await ctx.conversation.enter("showLinksForPoizon");
});

bot.hears("Pinduoduo", async (ctx) => {
  await ctx.conversation.enter("showLinksForPinduoduo");
});

bot.hears("К приложениям", async (ctx) => {
  await ctx.reply("Выберите приложения", {
    reply_markup: keyboardForDownloadingApp,
  });
});

// <= Блок, в котором предлагают скачать приложение под IOS или Андроид

// bot.on("::url", async (ctx) => {
//   await ctx.reply("мммм... ссылочка...", {
//     parse_mode: "HTML",
//   });
// });
// bot.hears("данные", async (ctx) => {
//   await ctx.reply(ctx.message.chat);
// });

bot.on("message", async (ctx) => {
  await ctx.reply(unprocessedMessages, {
    parse_mode: "HTML",
  });
});
//  <= Блок управление приложениями

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
//Обработка ошибок

bot.start({
  allowed_updates: ["chat_member", "message"],
});
