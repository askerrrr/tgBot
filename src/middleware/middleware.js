const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { getChatUsers } = require("../chatMember/chatMember");
const { chatMembers } = require("@grammyjs/chat-members");
const { session, MemorySessionStorages } = require("grammy");
const { singleOrder } = require("../services/order/singleOrder");
const { multipleOrders } = require("../services/order/multipleOrders");
const { listenersForOrder } = require("../listeners/listenersForOrder");
const { catchUnexpectedMessages } = require("./unexpectedMessages");

const adapter = new MemorySessionStorages();

function middlewareForConversations(bot) {
  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
  bot.use(createConversation(singleOrder));
  bot.use(createConversation(multipleOrders));
  listenersForOrder(bot);
  bot.use(chatMembers(adapter));
  getChatUsers(bot);
  bot.on("message", catchUnexpectedMessages);
}

module.exports = { middlewareForConversations };
