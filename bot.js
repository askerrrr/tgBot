const { env } = require("./env.js");
const { Bot } = require("grammy");
const { mainMenu } = require("./src/commands/mainMenu");
const { allListeners } = require("./src/listeners/allLinteners");
const { errorHandler } = require("./src/middleware/errorHandler");
const { middlewareForConversations } = require("./src/middleware/middleware");

const bot = new Bot(env.bot_token);

bot.hears("/menu", mainMenu);

allListeners(bot);
middlewareForConversations(bot);


bot.catch(errorHandler);

bot.start({
  allowed_updates: ["chat_member", "message"],
});
