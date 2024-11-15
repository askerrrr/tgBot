const JWT = require("jsonwebtoken");
const { env } = require("../../../../../env");
const { sendOrderFileToAdmin } = require("./sendOrderFileToAdmin");
const { addNewOrder } = require("../../../../database/services/addNewOrder");

async function sendOrderFileToServer(order, ctx) {
  try {
    const response = await fetch(env.bot_api_order, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT.sign(env.payload, env.bot_secret_key, {
          expiresIn: "5m",
        })}`,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log("Ошибка при отправлении заказа", err);
      return;
    }

    await addNewOrder(order);
    await sendOrderFileToAdmin(ctx, order);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sendOrderFileToServer };
