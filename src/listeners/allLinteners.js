const { listenersForApp } = require("./listenersForApp");
const { listenersForOther } = require("./listenersForOther");
const {
  listenersOfMainMenu,
} = require("./listenersOfMainMenu/listenersOfMainMenu");
const { getFileId } = require("../listeners/listenersForFile");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  listenersForApp(bot);
  listenersForOther(bot);
  listenersOfMainMenu(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
