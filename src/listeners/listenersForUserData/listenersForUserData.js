const { getId } = require("./getId");
const { getOrderInfo } = require("./getOrderInfo");

async function listenersForUserData(bot) {
  getId(bot);

  getOrderInfo(bot);
}

module.exports = { listenersForUserData };
