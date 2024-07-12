const { listenerOfMainMenu } = require("./listenerOfMainMenu");
const { listenersForOther } = require("./listenersForOther");
const { listenersForApp } = require("./listenersForApp");

function allListeners(bot) {
  listenerOfMainMenu(bot);
  listenersForOther(bot);
  listenersForApp(bot);
}

module.exports = { allListeners };
