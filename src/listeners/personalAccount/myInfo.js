const {
    getLastOrderInfo,
  } = require("../../database/services/getLastOrderInfo");
  
  async function getUserData(bot) {
    bot.hears("Мои данные", async (ctx) => {
      const userId = ctx.chat.id;
      const lastOrderInfo = await getLastOrderInfo(userId);
  
      console.log(`lastOrderInfo : ${lastOrderInfo}`);
  
      if (!lastOrderInfo) {
        await ctx.reply(`ID пользователя : ${userId}\nЗаказов еще не было`);
      }
  
      const lastOrderId = lastOrderInfo.file.id || "заказов еще не было";
      await ctx.reply(
        "Отправьте сообщение ниже админу, если возникнут вопросы по заказу"
      );
  
      await ctx.reply(
        `ID пользователя : ${userId}\nID последнего заказа : ${lastOrderId}`
      );
    });
  }
  
  module.exports = { getUserData };
  