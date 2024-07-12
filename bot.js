const { Bot } = require("grammy");
const { errorHandler } = require("./src/middleware/errorHandler");
const { startCommand } = require("./src/commands/start");
const { mainMenu } = require("./src/commands/mainMenu");
const { middlewareForApp } = require("./src/middleware/middlewareForApp");
const { allListeners } = require("./src/listeners/allLinteners");
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.hears("/start", startCommand);
bot.hears("/menu", mainMenu);

allListeners(bot);
middlewareForApp(bot);

bot.on("message", async (ctx) => {
  await ctx.reply(unprocessedMessages, {
    parse_mode: "HTML",
  });
});

bot.catch(errorHandler);

bot.start({
  allowed_updates: ["chat_member", "message"],
});
