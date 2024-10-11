const { addNewUser } = require("../database/services/addNewUser");
const {
  sendUserDataToServer,
} = require("../services/different/sendUserDataToServer");

module.exports.chatMember = async (bot) => {
  bot.hears("/start", async (ctx) => {
    try {
      await ctx.reply(
        `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен id-${ctx.chat.id}\nДля дальнейшей работы воспользуйтесь 'Меню' `
      );

      const chatMember = await ctx.chatMembers.getChatMember(
        ctx.chat.id,
        ctx.from.id
      );

      const newUser = {
        tgId: chatMember.user.id,
        firstName: chatMember.user.first_name,
        userName:
          chatMember.user.user_name === undefined
            ? ""
            : chatMember.user.user_name,
        orders: [],
      };

      await addNewUser(newUser);
      await sendUserDataToServer(newUser);
    } catch (err) {
      console.log(err.message);
    }
  });
};
