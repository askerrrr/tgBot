const MongoClient = require("mongodb").MongoClient;
const { chatMembers } = require("@grammyjs/chat-members");
const { MemorySessionStorage } = require("grammy");
const mongodb = new MongoClient("mongodb://localhost:27017");

const mongo = async (bot) => {
  const adapter = new MemorySessionStorage();
  bot.use(chatMembers(adapter));
  await mongodb.connect();
  const collection = mongodb.db("tgusers").collection("users");
  collection.insertOne();
  bot.hears("/start", async (ctx) => {
    const chatMember = ctx.chatMember.getChatMember(ctx.chat.id, ctx.from.id);
    collection.insertOne(chatMember.user);
  });
};


module.exports = { mongo };
