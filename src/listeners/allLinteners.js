const { listenerOfMainMenu } = require("./listenerOfMainMenu");
const { listenersForOther } = require("./listenersForOther");
const { listenersForApp } = require("./listenersForApp");
const { getFileId } = require("../listeners/listenersForFile");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  listenerOfMainMenu(bot);
  listenersForOther(bot);
  listenersForApp(bot);
  //getFileId(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
