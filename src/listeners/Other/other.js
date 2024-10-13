const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");
const { getUserData } = require("./getUserData");

async function other(bot) {
  getUserData(bot);

  getTemplate(bot);

  downloadApp(bot);
}

module.exports = { other };
