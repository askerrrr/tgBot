const { MongoClient, ServerApiVersion } = require("mongodb");
const env = require("../../env");
const e = require("cors");

const client = new MongoClient(env.mongourl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
})();

const collection = client.db("TelegramUsers").collection("users");

module.exports.chat = async (bot) => {
  bot.hears("/start", async (ctx) => {
    await ctx.reply(
      `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен id-${ctx.chat.id}, в дальнейшем этот ID будет соответствовать номеру вашего заказа\nДля дальнейшей работы воспользуйтесь 'Меню' `
    );

    const chatMember = await ctx.chatMembers.getChatMember(
      ctx.chat.id,
      ctx.from.id
    );
    const existingDocument = await collection.findOne(chatMember.user);
    if (!existingDocument) {
      return await collection.insertOne(chatMember.user);
    } else {
      console.log("Document already exists in the collection");
    }
  });
};
