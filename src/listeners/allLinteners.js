const { listenersForApp } = require("./listenersForApp/listenersForApp");
const { listenersForOther } = require("./listenersForOther/listenersForOther");
const {
  listenersForOrder,
} = require("./listenersForTheOrder/listenersForOrder");
const {
  listenersOfMainMenu,
} = require("./listenersOfMainMenu/listenersOfMainMenu");
const { getFileId } = require("./differentListeners/listenersForFile");
const { backToMainMenu } = require("./differentListeners/backToMainMenu");
const { backToOtherMenu } = require("./differentListeners/backToOtherMenu");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  backToMainMenu(bot);
  backToOtherMenu(bot);
  listenersForApp(bot);
  listenersForOther(bot);
  listenersOfMainMenu(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
