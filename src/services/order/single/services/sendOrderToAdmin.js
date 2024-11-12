const { env } = require("../../../../../env");
const {
  makeOrderNotification,
} = require("../../../different/makeOrderNotification");

async function sendOrderToAdmin(ctx, order, imageId) {
  try {
    const messageToAdmin = makeOrderNotification(order);

    await ctx.api.sendMessage(env.admin_id, messageToAdmin);
    await ctx.api.sendPhoto(env.admin_id, `${imageId}`);
  } catch (err) {
    console.log(err);
  }

  // await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
  // await ctx.api.sendPhoto(env.admin2_id, `${orderInfo.image}`);
}

module.exports = { sendOrderToAdmin }; //экспорт в src\services\order\singleOrder.js
