const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");

async function listenersForOther(bot) {
  getTemplate(bot);

  downloadApp(bot);
}

module.exports = { listenersForOther };
