const { MemorySessionStorage } = require("grammy");
const { chatMembers } = require("@grammyjs/chat-members");

const adapter = new MemorySessionStorage();
function chatMember(bot) {
  bot.use(chatMembers(adapter));
}

module.exports = { chatMember };
