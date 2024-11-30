var JWT = require("jsonwebtoken");
var { env } = require("../../../env");
var {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.updateCurrentOrderStatus = async (activeOrders, ctx) => {
  let userId, file;

  for (let key in activeOrders) {
    userId = activeOrders[key].userId;
    file = activeOrders[key].file;
  }

  var response = await fetch(`${env.bot_api_status}/${userId}/${file.id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${JWT.sign(env.payload, env.bot_secret_key, {
        expiresIn: "5m",
      })}`,
    },
  });

  if (!response.ok) {
    console.error("Ошибка при запросе статуса...");
    await ctx.reply(
      "Что-то пошло не так при попытке обновить статус, повторите позже..."
    );

    return;
  }

  var json = await response.json();

  let [statusValue, statusId] = json.status.split(":");

  statusId = statusId.split("")[statusId.length - 1];

  var newStatus = `${statusValue}:${statusId}`;

  var currentStatusValue = file.status.split(":")[0];

  if (currentStatusValue !== statusValue) {
    return await updateOrderStatus(userId, file.id, newStatus);
  }

  return;
};
