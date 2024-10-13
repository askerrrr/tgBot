const { chatMembers } = require("@grammyjs/chat-members");
const { chatMember } = require("../chatMember/chatMember");
const { session, MemorySessionStorage } = require("grammy");
const { calcOrderCost } = require("../services/orderCost/calcOrderCost");
const { orderCost } = require("../listeners/MainMenu/orderCost");
const { order } = require("../listeners/MainMenu/order");
const { catchUnexpectedMessages } = require("./unexpectedMessages");
const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { makingAnOrder } = require("../services/order/makingAnOrder");

//
//
//

const adapter = new MemorySessionStorage();

async function middlewareForConversations(bot) {
  bot.use(chatMembers(adapter));
  chatMember(bot);

  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());

  bot.use(createConversation(makingAnOrder));
  bot.use(createConversation(calcOrderCost));

  orderCost(bot);
  order(bot);

  bot.on("message", catchUnexpectedMessages);
}
module.exports = { middlewareForConversations };
