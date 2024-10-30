const { FAQ } = require("./FAQ/FAQ");
const { other } = require("./Other/other");
const { guides } = require("./Guides/Guides");
const { mainMenu } = require("./MainMenu/mainMenu");
const { downloadApp } = require("./downloadApp/downloadApp");
const { diffListeners } = require("./different/diffListeners");
const { personalAccount } = require("./personalAccount/personalAccount");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  FAQ(bot);
  other(bot);
  guides(bot);
  mainMenu(bot);
  downloadApp(bot);
  diffListeners(bot);
  personalAccount(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
