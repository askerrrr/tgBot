const { FAQ } = require("./FAQ/FAQ");
const { guides } = require("./Guides/Guides");
const { diffListeners } = require("./different/diffListeners");
const { other } = require("./Other/other");
const { downloadApp } = require("./downloadApp/downloadApp");
const { mainMenu } = require("./MainMenu/mainMenu");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  FAQ(bot);
  other(bot);
  guides(bot);
  mainMenu(bot);
  downloadApp(bot);
  diffListeners(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
