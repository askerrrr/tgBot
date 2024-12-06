var JWT = require("jsonwebtoken");
var { env } = require("../../../env");
var {
  updateOrderStatus,
} = require("../../database/services/updateOrderStatus");

module.exports.updateCurrentOrderStatus = async (activeOrders, ctx) => {
  try {
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
      await env.sendErrToAdmin(ctx, err, "Запрос на обновление статуса");

      return;
    }

    var json = await response.json();

    var currentStatusValue = orderStatus.split(":")[0];

    if (json.status !== undefined && currentStatusValue !== json.status) {
      return await updateOrderStatus(userId, json.orderId, json.status);
    }

    return;
  } catch (err) {
    await ctx.api.sendMessage(env.admin_id, err);
  }
};
// json.map(
//       async (order) =>
//         await updateOrderStatus(order.userId, order.orderId, order.status)
//     );
