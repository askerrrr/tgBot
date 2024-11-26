const { getTemplate } = require("./getTemplate");
const { downloadApp } = require("./downloadApp");
const { personalAccount } = require("./personalAccount");

module.exports.other = async (bot) => {
  getTemplate(bot);

  downloadApp(bot);

  personalAccount(bot);
};
