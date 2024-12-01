const JWT = require("jsonwebtoken");
const { env } = require("../../../env");
const {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.updateCurrentOrderStatus = async (activeOrders, ctx) => {
  let userId, orderId;

  for (let key in activeOrders) {
    userId = activeOrders[key].userId;
    orderId = activeOrders[key].id;
    orderStatus = activeOrders[key].orderStatus;
  }

  const response = await fetch(`${env.bot_api_status}/${userId}/${orderId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${JWT.sign(env.payload, env.bot_secret_key, {
        expiresIn: "5m",
      })}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    console.log("response.err", err);

    return;
  }

  const json = await response.json();

  console.log(json);
  let [statusValue, statusId] = json.status.split(":");

  statusId = statusId.split("")[statusId.length - 1];

  const newStatus = `${statusValue}:${statusId}`;

  const currentStatusValue = orderStatus.split(":")[0];

  if (currentStatusValue !== statusValue) {
    return await updateOrderStatus(userId, orderId, newStatus);
  }

  return;
};
