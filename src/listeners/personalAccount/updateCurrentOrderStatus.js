const { env } = require("../../../env");

const {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

async function updateCurrentOrderStatus(activeOrders, ctx) {
  let userId, file;
  for (let key in activeOrders) {
    userId = activeOrders[key].userId;
    file = activeOrders[key].file;
  }

  const response = await fetch(
    `https://test-nodejs.ru/status/current/${userId}/${file.id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${env.auth_token}`,
      },
    }
  );

  if (!response.ok) {
    console.log("Ошибка при запросе статуса...");
    await ctx.reply("Что то мне плохо, попробуйте позже");
  }

  const json = await response.json();

  let [statusValue, statusId] = json.status.split(":");

  statusId = statusId.split("")[statusId.length - 1];

  const newStatus = `${statusValue}:${statusId}`;

  const currentStatusValue = file.status.split(":")[0];

  if (currentStatusValue !== statusValue) {
    return await updateOrderStatus(userId, file.id, newStatus);
  }
  return null;
}

module.exports = { updateCurrentOrderStatus };
