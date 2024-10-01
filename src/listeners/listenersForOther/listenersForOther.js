const { getId } = require("./getId");
const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");

async function listenersForOther(bot) {
  getId(bot);

  getTemplate(bot);

  downloadApp(bot);
}

module.exports = { listenersForOther };
