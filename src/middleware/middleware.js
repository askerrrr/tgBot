const { chatMembers } = require("@grammyjs/chat-members");
const { chatMember } = require("../chatMember/chatMember");
const { session, MemorySessionStorage } = require("grammy");
const { calcOrderCost } = require("../services/orderCost/calcOrderCost");
const { orderCost } = require("../listeners/listenersOfMainMenu/orderCost");
const { singleOrder } = require("../services/order/singleOrder/singleOrder");

const {
  listenersForOrder,
} = require("../listeners/listenersForTheOrder/listenersForOrder");

const { catchUnexpectedMessages } = require("./unexpectedMessages");

const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const {
  multipleOrders,
} = require("../services/order/multipleOrders/multipleOrders");

//
//
//

const adapter = new MemorySessionStorage();

async function middlewareForConversations(bot) {
  await bot.use(await chatMembers(adapter));
  await chatMember(bot);

  await bot.use(await session({ initial: () => ({}) }));
  await bot.use(await conversations());

  await bot.use(await createConversation(singleOrder));
  await bot.use(await createConversation(multipleOrders));
  await bot.use(await createConversation(calcOrderCost));
  await orderCost(bot);
  await listenersForOrder(bot);

  bot.on("message", catchUnexpectedMessages);
}
module.exports = { middlewareForConversations };
