const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");
const { getUserData } = require("./getUserData");
const { getCurrentOrderStatus } = require("./getCurrentOrderStatus");

async function other(bot) {
  getUserData(bot);

  getTemplate(bot);

  downloadApp(bot);

  getCurrentOrderStatus(bot);
}

module.exports = { other };
