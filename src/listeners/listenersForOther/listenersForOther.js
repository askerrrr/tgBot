const { getId } = require("./getId");
const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");
const { getOrderInfo } = require("./getOrderInfo");

async function listenersForOther(bot) {
  getId(bot);

  getTemplate(bot);

  downloadApp(bot);

  getOrderInfo(bot);
}

module.exports = { listenersForOther };
