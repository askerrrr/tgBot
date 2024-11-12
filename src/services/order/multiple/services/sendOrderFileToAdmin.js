const { env } = require("../../../../../env");
const {
  makeOrderNotification,
} = require("../../../different/makeOrderNotification");

async function sendOrderFileToAdmin(ctx, order) {
  const messageToAdmin = makeOrderNotification(order);

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);

  //await ctx.api.sendMessage(env.admin2_id, messageToAdmin);
}

module.exports = { sendOrderFileToAdmin };
