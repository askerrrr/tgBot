const { listenersForApp } = require("./listenersForApp");
const { listenersForOther } = require("./listenersForOther");
const { listenerOfMainMenu } = require("./listenerOfMainMenu");
const { getFileId } = require("../listeners/listenersForFile");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  listenersForApp(bot);
  listenersForOther(bot);
  listenerOfMainMenu(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
