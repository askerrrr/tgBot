const JWT = require("jsonwebtoken");
const { env } = require("../../../../env");
const { sendOrderToAdmin } = require("./sendOrderToAdmin");
const { addNewOrder } = require("../../../database/services/addNewOrder");

module.exports.sendOrderToServer = async (order, ctx, fileId) => {
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
      await ctx.reply(
        "Произошла ошибка при формировании заказа, попробуйте еще раз"
      );
      return;
    }

    await addNewOrder(order);
    await sendOrderToAdmin(ctx, order, fileId);
  } catch (err) {
    console.log(err);
  }
};