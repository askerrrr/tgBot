var JWT = require("jsonwebtoken");
var { env } = require("../../../env");
var {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.updateCurrentOrderStatus = async (activeOrders) => {
  let userId, orderId;

  for (let key in activeOrders) {
    userId = activeOrders[key].userId;
    orderId = activeOrders[key].id;
    orderStatus = activeOrders[key].orderStatus;
  }

  var response = await fetch(`${env.bot_api_status}/${userId}/${orderId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${JWT.sign(env.payload, env.bot_secret_key, {
        expiresIn: "5m",
      })}`,
    },
  });

  if (!response.ok) {
    var err = await response.text();
    console.log("response.err", err);

    return;
  }

  var json = await response.json();

  var currentStatusValue = orderStatus.split(":")[0];

  if (json.status !== undefined && currentStatusValue !== json.status) {
    return await updateOrderStatus(userId, json.orderId, json.status);
  }

  return;
};
// json.map(
//       async (order) =>
//         await updateOrderStatus(order.userId, order.orderId, order.status)
//     );
