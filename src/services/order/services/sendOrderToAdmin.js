const { env } = require("../../../../env");
const { makeOrderNotification } = require("./makeOrderNotification");

module.exports.sendOrderToAdmin = async (ctx, order, fileId) => {
  try {
    const messageToAdmin = makeOrderNotification(order);

    if (order?.type) {
      await ctx.api.sendMessage(env.admin_id, messageToAdmin);
      await ctx.api.sendPhoto(env.admin_id, `${fileId}`);
    }

    await ctx.api.sendMessage(env.admin_id, messageToAdmin);
    await ctx.api.sendDocument(env.admin_id, `${fileId}`);
  } catch (err) {
    console.log(err);
  }
};
