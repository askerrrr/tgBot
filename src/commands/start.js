module.exports.startCommand = async (ctx) => {
  await ctx.reply(
    `${ctx.from.first_name}, добро пожаловать в наш бот  🤖\nВам присвоен id-${ctx.chat.id}, в дальнейшем этот ID будет соответствовать номеру вашего заказа\nДля дальнейшей работы воспользуйтесь 'Меню' `
  );
};

