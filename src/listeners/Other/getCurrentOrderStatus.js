const { env } = require("../../../env");
const {
  getLastOrderInfo,
} = require("../../database/services/getLastOrderInfo");
const {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

async function getCurrentOrderStatus(bot) {
  bot.hears("Узнать статус заказа", async (ctx) => {
    const userId = ctx.chat.id;

    const order = await getLastOrderInfo(userId);
    console.log(order);
    const fileId = order.file.id;

    const response = await fetch(`/status/current/${userId}/${fileId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${env.auth_token}`,
      },
    });

    if (!response.ok) {
      console.log("Error when requesting the status...");
    }

    const requestedStatus = await response.json();

    const currentStatus = order.file.status;

    if (currentStatus !== requestedStatus) {
      await ctx.reply(`Текущий статус заказа :${requestedStatus}`);
      await updateOrderStatus(userId, fileId, requestedStatus);
    }

    await ctx.reply(`Текущий статус заказа : ${currentStatus}`);
  });
}

module.exports = { getCurrentOrderStatus };
