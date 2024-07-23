const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { session } = require("grammy");
const { singleOrder } = require("../services/order/singleOrder");
const { multipleOrders } = require("../services/order/multipleOrders");
const { listenersForOrder } = require("../listeners/listenersForOrder");
const { catchUnexpectedMessages } = require("./unexpectedMessages");

function middlewareForConversations(bot) {
  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
  bot.use(createConversation(singleOrder));
  bot.use(createConversation(multipleOrders));
  listenersForOrder(bot);
  bot.on("message", catchUnexpectedMessages);
}

module.exports = { middlewareForConversations };
