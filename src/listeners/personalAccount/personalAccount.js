const { getUserData } = require("./myInfo");

const { getActiveOrders } = require("./activeOrders");

async function personalAccount(bot) {
  getUserData(bot);
  getActiveOrders(bot);
}

module.exports = { personalAccount };
