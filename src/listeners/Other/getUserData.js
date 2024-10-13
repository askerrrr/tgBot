const {
  getLastOrderInfo,
} = require("../../database/services/getLastOrderInfo");

async function getUserData(bot) {
  bot.hears("Мои данные", async (ctx) => {
    const chatId = ctx.chat.id;
    const lastOrderInfo = await getLastOrderInfo(chatId);
    const lastOrderId = lastOrderInfo.file.id;

    await ctx.reply(
      "Отправьте сообщение ниже админу, если возникнут вопросы по заказу"
    );
    await ctx.reply(
      `ID пользователя : ${chatId}\nID последнего заказа : ${lastOrderId}`
    );
  });
}

module.exports = { getUserData };
