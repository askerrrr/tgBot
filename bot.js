var { Bot } = require("grammy");
var { env } = require("./env.js");
var { mainMenu } = require("./src/commands/mainMenu");
var { allListeners } = require("./src/listeners/allLinteners");
var { setCommands } = require("./src/commands/setCommands.js");
var { errorHandler } = require("./src/middleware/errorHandler");
var { middlewareForConversations } = require("./src/middleware/middleware");

var bot = new Bot(env.bot_token);

setCommands(bot);
bot.hears("/menu", mainMenu);

allListeners(bot);
middlewareForConversations(bot);

bot.catch(errorHandler);

bot.start({
  allowed_updates: ["chat_member", "message"],
});
