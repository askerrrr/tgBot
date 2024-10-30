const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");
const { personalAccount } = require("./personalAccount");

async function other(bot) {
  getTemplate(bot);

  downloadApp(bot);

  personalAccount(bot);
}

module.exports = { other };
