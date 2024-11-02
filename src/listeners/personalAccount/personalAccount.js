const { getUserData } = require("./myInfo");
const { getActiveOrders } = require("./activeOrders");
const { getCompletedOrders } = require("./completedOrders");

async function personalAccount(bot) {
  getUserData(bot);
  getActiveOrders(bot);
  getCompletedOrders(bot);
}

module.exports = { personalAccount };
