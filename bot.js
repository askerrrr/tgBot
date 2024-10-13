const { Bot } = require("grammy");
const { env } = require("./env.js");
const { FAQ } = require("./src/commands/FAQ.js");
const { mainMenu } = require("./src/commands/mainMenu");
const { allListeners } = require("./src/listeners/allLinteners");
const { errorHandler } = require("./src/middleware/errorHandler");
const { setCommands } = require("./src/commands/setCommands.js");
const { middlewareForConversations } = require("./src/middleware/middleware");

const bot = new Bot(env.bot_token);

setCommands(bot);
bot.hears("/menu", mainMenu);
bot.hears("/faq", FAQ);

allListeners(bot);
middlewareForConversations(bot);

bot.catch(errorHandler);

bot.start({
  allowed_updates: ["chat_member", "message"],
});
