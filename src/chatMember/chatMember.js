const sendUserDataToServer = require("../services/different/sendUserDataToServer");

module.exports.chat = async (bot) => {
  bot.hears("/start", async (ctx) => {
    try {
      await ctx.reply(
        `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен id-${ctx.chat.id}, в дальнейшем этот ID будет соответствовать номеру вашего заказа\nДля дальнейшей работы воспользуйтесь 'Меню' `
      );

      const chatMember = await ctx.chatMembers.getChatMember(
        ctx.chat.id,
        ctx.from.id
      );

      await sendUserDataToServer(chatMember.user)
        .then((data) => data)
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  });
};
