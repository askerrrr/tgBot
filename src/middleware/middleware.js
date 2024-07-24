const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { session, MemorySessionStorage } = require("grammy");
const { chatMembers } = require("@grammyjs/chat-members");
const { mongo } = require("../chatMember/chatMember");
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
  mongo(bot);
  bot.on("message", catchUnexpectedMessages);
}

module.exports = { middlewareForConversations };
