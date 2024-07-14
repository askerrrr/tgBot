const { listenerOfMainMenu } = require("./listenerOfMainMenu");
const { listenersForOther } = require("./listenersForOther");
const { listenersForApp } = require("./listenersForApp");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  listenerOfMainMenu(bot);
  listenersForOther(bot);
  listenersForApp(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
