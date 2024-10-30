const { env } = require("../../../env");
const { statusTranslate } = require("../../services/different/statusTranslate"); //добавить раздел с активными и завершенными заказами. этот раздел наверное будет в личном кабинете и отдельно кнопка с статусами активныз заказов
const {
  getLastOrderInfo,
} = require("../../database/services/getLastOrderInfo");
const {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

async function getCurrentOrderStatus(bot) {
  bot.hears("Статус заказа", async (ctx) => {
    const userId = ctx.chat.id;

    const order = await getLastOrderInfo(userId);

    const fileId = order.file.id;

    const response = await fetch(
      `https://test-nodejs.ru/status/current/${userId}/${fileId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${env.auth_token}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error when requesting the status...");
    }

    const json = await response.json();
    const status = json.status.split(":")[1];
    const statusId = status.split("")[status.length - 1];

    const currentStatus = order.file.status.split(" ")[0];

    if (currentStatus !== statusId) {
      const translatedStatus = statusTranslate(statusId);

      await ctx.reply(`Текущий статус заказа :\n\n${translatedStatus}`);
      await updateOrderStatus(userId, fileId, translatedStatus);
    }
  });
}

module.exports = { getCurrentOrderStatus };
