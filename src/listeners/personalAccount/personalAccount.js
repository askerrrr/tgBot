const { getUserData } = require("./myInfo");
const { getCurrentOrderStatus } = require("./getCurrentOrderStatus");
const { getActiveOrders } = require("./activeOrders");

async function personalAccount(bot) {
  getUserData(bot);
  getActiveOrders(bot);
  getCurrentOrderStatus(bot);
}

module.exports = { personalAccount };
