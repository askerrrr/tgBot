const { orderInfo } = require("../../../dataBase");

async function getOrderInfo(bot) {
  bot.hears("Получить информацию о последнем заказе", async (ctx) => {
    const chatId = ctx.chat.id;

    const order = await orderInfo(chatId);
    await ctx.reply(
      `Информация о последнем заказе\n\nВаш ID : ${order.tgId}\nНомер телефона : ${order.phone}\nID заказа : ${order.file.id}\nВремя заказа : ${order.date}\n\nСсылка на файл : ${order.file.url}\n`
    );
  });
}

module.exports = { getOrderInfo };
