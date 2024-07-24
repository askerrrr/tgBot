const { MongoClient } = require("mongodb").MongoClient;
const mongodb = new MongoClient("mongodb://localhost:27017");

(async () => {
  try {
    mongodb.connect();
  } catch (err) {
    console.log(err);
  }
})();

module.exports.getChatUsers = async (bot) => {
  bot.hears("/start", async (ctx) => {
    const chatMember = await ctx.chatMember.getChatMember(
      ctx.chat.id,
      ctx.from.id
    );
  });
};
