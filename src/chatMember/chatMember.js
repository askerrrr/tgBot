const { addNewUser } = require("../../connection");
const {
  sendUserDataToServer,
} = require("../services/different/sendUserDataToServer");

module.exports.chatMember = async (bot) => {
  bot.hears("/start", async (ctx) => {
    try {
      await ctx.reply(
        `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен id-${ctx.chat.id}, в дальнейшем этот ID будет соответствовать номеру вашего заказа\nДля дальнейшей работы воспользуйтесь 'Меню' `
      );

      const chatMember = await ctx.chatMembers.getChatMember(
        ctx.chat.id,
        ctx.from.id
      );

      const userData = {
        tgId: chatMember.user.id,
        firstName: chatMember.user.first_name,
        userName:
          chatMember.user.user_name === undefined
            ? ""
            : chatMember.user.user_name,
        orders: [],
      };

      console.log(JSON.stringify(userData));
      await addNewUser(userData);
      await sendUserDataToServer(userData);
    } catch (err) {
      console.log(err.message);
    }
  });
};
