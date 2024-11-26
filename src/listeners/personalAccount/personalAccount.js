const { getActiveOrders } = require("./activeOrders");
const { getCompletedOrders } = require("./completedOrders");

module.exports.personalAccount = async (bot) => {
  getActiveOrders(bot);
  getCompletedOrders(bot);
};
