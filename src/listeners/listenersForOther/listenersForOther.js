const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");
const { getUserData } = require("./getUserData");

async function listenersForOther(bot) {
  getUserData(bot);

  getTemplate(bot);

  downloadApp(bot);
}

module.exports = { listenersForOther };
