const MongoClient = require("mongodb").MongoClient;

const mongodb = new MongoClient("mongodb://localhost:27017");
const collection = mongodb.db("grammyUsers").collection("users");

(async () => {
  try {
    await mongodb.connect();
  } catch (err) {
    console.log(err, "Ошибка подключение mongodb...");
  }
})();

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
