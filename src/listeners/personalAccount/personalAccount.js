const { getActiveOrders } = require("./activeOrders");
const { getCompletedOrders } = require("./completedOrders");

async function personalAccount(bot) {
  getActiveOrders(bot);
  getCompletedOrders(bot);
}

module.exports = { personalAccount };
