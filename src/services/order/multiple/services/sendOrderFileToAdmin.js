const { env } = require("../../../../../env");
const {
  makeOrderNotification,
} = require("../../../different/makeOrderNotification");

async function sendOrderFileToAdmin(ctx, order, fileId) {
  const messageToAdmin = makeOrderNotification(order);

  await ctx.api.sendMessage(env.admin_id, messageToAdmin);
  await ctx.api.sendDocument(env.admin_id, `${fileId}`);
}

module.exports = { sendOrderFileToAdmin };
