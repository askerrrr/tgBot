const {
  getLastOrderInfo,
} = require("../../database/services/getLastOrderInfo");

async function getUserData(bot) {
  bot.hears("Мои данные", async (ctx) => {
    const userId = ctx.chat.id;
    console.log(userId);
    const lastOrderInfo = await getLastOrderInfo(userId);
    const lastOrderId = lastOrderInfo.file.id;

    await ctx.reply(
      "Отправьте сообщение ниже админу, если возникнут вопросы по заказу"
    );

    await ctx.reply(
      `ID пользователя : ${userId}\nID последнего заказа : ${lastOrderId}`
    );
  });
}

module.exports = { getUserData };
