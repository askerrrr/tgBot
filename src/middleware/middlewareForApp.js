const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");

const { showLinksFor1688 } = require("../services/linksForApp/linkFor1688");
const { showLinksForTaobao } = require("../services/linksForApp/linkForTaobao");
const { showLinksForPoizon } = require("../services/linksForApp/linkForPoizon");
const {
  showLinksForPinduoduo,
} = require("../services/linksForApp/linkForPinduoduo");

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
