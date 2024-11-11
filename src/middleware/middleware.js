const { chatMembers } = require("@grammyjs/chat-members");
const { chatMember } = require("../chatMember/chatMember");
const { session, MemorySessionStorage } = require("grammy");
const { single } = require("../services/order/single/single");
const { orderCost } = require("../listeners/MainMenu/orderCost");
const { multiple } = require("../services/order/multiple/multiple");
const { catchUnexpectedMessages } = require("./unexpectedMessages");
const { calcOrderCost } = require("../services/orderCost/calcOrderCost");
const { orderSingleItems } = require("../listeners/Order/orderSilgleItem");
const { orderMultipleItems } = require("../listeners/Order/orderMultipleItems");
const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");

//
//
//

const adapter = new MemorySessionStorage();

async function middlewareForConversations(bot) {
  bot.use(chatMembers(adapter));
  chatMember(bot);

  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());

  bot.use(createConversation(single));
  bot.use(createConversation(multiple));
  bot.use(createConversation(calcOrderCost));

  orderCost(bot);
  orderSingleItems(bot);
  orderMultipleItems(bot);

  bot.on("message", catchUnexpectedMessages);
}
module.exports = { middlewareForConversations };
