const { Bot } = require("grammy");
const { errorHandler } = require("./src/middleware/errorHandler");
const { startCommand } = require("./src/commands/start");
const { mainMenu } = require("./src/commands/mainMenu");
const { allListeners } = require("./src/listeners/allLinteners");
const { middlewareForConversations } = require("./src/middleware/middleware");
const {
  catchUnexpectedMessages,
} = require("./src/middleware/unexpectedMessages");

require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.hears("/start", startCommand);

bot.hears("/menu", mainMenu);

allListeners(bot);
middlewareForConversations(bot);

bot.on("message", catchUnexpectedMessages);

bot.catch(errorHandler);

bot.start({
  allowed_updates: ["chat_member", "message"],
});
