const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const {
  showLinksFor1688,
  showLinksForTaobao,
  showLinksForPoizon,
  showLinksForPinduoduo,
} = require("../services/showLinks");

const { session } = require("grammy");

function middlewareForApp(bot) {
  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
  bot.use(createConversation(showLinksFor1688));
  bot.use(createConversation(showLinksForTaobao));
  bot.use(createConversation(showLinksForPoizon));
  bot.use(createConversation(showLinksForPinduoduo));
}

module.exports = { middlewareForApp };
