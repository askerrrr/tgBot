const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { session } = require("grammy");

module.exports = {};

function middlewareForConversations(bot) {
  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
}

module.exports = { middlewareForConversations };
