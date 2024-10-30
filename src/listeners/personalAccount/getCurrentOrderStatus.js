const { env } = require("../../../env");
const { statusTranslate } = require("../../services/different/statusTranslate"); //добавить раздел с активными и завершенными заказами. этот раздел наверное будет в личном кабинете и отдельно кнопка с статусами активныз заказов//добавить динамическое отображение  заказов
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

    const fileId = order?.file.id;

    if (!fileId) {
      return await ctx.reply(
        "Вы еще ничего не заказывали, но вы можете это исправить!"
      );
    }

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

    let [statusValue, statusId] = json.status.split(":");

    statusId = statusId.split("")[statusId.length - 1];

    const newStatus = `${statusValue}:${statusId}`;

    const currentStatusValue = order.file.status.split("")[0];

    if (currentStatusValue !== statusValue) {
      const translatedStatus = statusTranslate(statusId);

      await ctx.reply(`Текущий статус заказа :\n\n${translatedStatus}`);
      await updateOrderStatus(userId, fileId, newStatus);
    }
  });
}

module.exports = { getCurrentOrderStatus };
