const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { session } = require("grammy");
const { singleOrder } = require("../services/order/singleOrder");
const { multipleOrders } = require("../services/order/multipleOrders");
const { listenersForOrder } = require("../listeners/listenersForOrder");

function middlewareForConversations(bot) {
  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
  bot.use(createConversation(singleOrder));
  bot.use(createConversation(multipleOrders));
  listenersForOrder(bot);
}

module.exports = { middlewareForConversations };
234;
